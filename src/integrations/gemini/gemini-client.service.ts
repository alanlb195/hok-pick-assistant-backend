import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

export enum TaskTypes {
    SEMANTIC_SIMILARITY = 'SEMANTIC_SIMILARITY',
    CLASSIFICATION = 'CLASSIFICATION',
    CLUSTERING = 'CLUSTERING',
    RETRIEVAL_DOCUMENT = 'RETRIEVAL_DOCUMENT',
    RETRIEVAL_QUERY = 'RETRIEVAL_QUERY',
    CODE_RETRIEVAL_QUERY = 'CODE_RETRIEVAL_QUERY',
    QUESTION_ANSWERING = 'QUESTION_ANSWERING',
    FACT_VERIFICATION = 'FACT_VERIFICATION',
}

@Injectable()
export class GeminiAIClient {
    private ai: GoogleGenAI;
    private modelName = 'gemini-2.5-flash';


    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY');
        this.ai = new GoogleGenAI({ apiKey });
    }

    // Chatbot section - docs: ai.google.dev/gemini-api/docs/text-generation
    // multi conversational chat using sendMessageStream
    async sendChatMessageStream({
        history,
        message, // acts like the new prompt
        systemInstruction,
    }: {
        history: { role: 'user' | 'model'; text: string }[];
        message: string;
        systemInstruction?: string;
    }) {
        const chat = this.ai.chats.create({
            model: this.modelName,
            history: history.map(entry => ({
                role: entry.role,
                parts: [{ text: entry.text }],
            })),
            config: {
                systemInstruction,
                temperature: 0.3,
            },
        });

        const stream = await chat.sendMessageStream({ message });
        return stream;
    }

    // Simple response with system instructions and Streaming responses
    async generateContentStream(prompt: string, systemInstruction?: string) {
        const response = await this.ai.models.generateContentStream({
            model: this.modelName,
            contents: prompt,
            config: {
                systemInstruction: systemInstruction ?? undefined,
            },
        });

        return response;
    }

    // Simple response with system instructions, no stream response
    async generateContent(prompt: string, systemInstruction?: string): Promise<string> {
        const result = await this.ai.models.generateContent({
            model: this.modelName,
            contents: prompt,
            config: {
                systemInstruction: systemInstruction ?? undefined,
            },
        });

        return result.text ?? '';
    }

    // Generating embeddings section - docs: https://ai.google.dev/gemini-api/docs/embeddings
    // embedContent method to generate text embeddings
    async generateEmbed(text: string, taskType: TaskTypes) {

        const response = await this.ai.models.embedContent({
            model: 'gemini-embedding-001',
            contents: text, // The content to embed. Only the parts.text fields will be counted.
            config: {
                taskType: taskType
            }
        });

        // this method return: (method) Array<ContentEmbedding>.values(): ArrayIterator<ContentEmbedding>
        return response.embeddings?.[0]?.values ?? [];
    }


    // Get data from image and return a specific response in json to insert in a form in the frontend:
    async getImageContent() {

        const ai = new GoogleGenAI({});
        const base64ImageFile = fs.readFileSync("path/to/small-sample.jpg", {
            encoding: "base64",
        });

        const contents = [
            {
                inlineData: {
                    mimeType: "image/jpeg",
                    data: base64ImageFile,
                },
            },
            { text: "Caption this image." },
        ];

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
        });
        console.log(response.text);
    }

    /**
     * Analiza una imagen en base64 y devuelve una respuesta generada por Gemini.
     * @param base64Image Base64 de la imagen (sin encabezado data URL).
     * @param prompt Instrucción para Gemini sobre qué hacer con la imagen.
     * @param mimeType Tipo MIME de la imagen, por defecto "image/jpeg"
     * @returns string con la respuesta del modelo (por ejemplo, una descripción).
     */
    async analyzeImageFromBase64(
        base64Image: string,
        prompt: string,
        mimeType: string = 'image/jpeg'
    ): Promise<string> {
        const contents = [
            {
                inlineData: {
                    mimeType,
                    data: base64Image,
                },
            },
            {
                text: prompt,
            },
        ];

        const response = await this.ai.models.generateContent({
            model: 'gemini-1.5-flash', // o gemini-2.5-flash si lo tienes disponible
            contents,
        });

        return response.text ?? '';
    }


}
