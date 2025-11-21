import { Injectable } from '@nestjs/common';
import { QdrantClient } from '@qdrant/js-client-rest';

export interface Point {
    id: string | number;
    vector: number[];
    payload?: Record<string, any>;
}

@Injectable()
export class QdrantService {
    private client: QdrantClient;

    constructor() {
        this.client = new QdrantClient({
            host: process.env.QDRANT_HOST ?? 'localhost',
            port: Number(process.env.QDRANT_PORT ?? 6333),
        });
    }

    /** Create a new Qdrant collection */
    async createCollection(name: string, vectorSize: number) {
        return this.client.createCollection(name, {
            vectors: { size: vectorSize, distance: 'Cosine' },
        });
    }

    /** Insert or update vectors */
    async upsert(collectionName: string, points: Point[]) {
        return this.client.upsert(collectionName, {
            wait: true,
            points,
        });
    }

    /** Query vector similarity search */
    async query(collectionName: string, vector: number[], limit = 5) {
        return this.client.query(collectionName, {
            query: vector,
            limit,
            with_payload: true,
        });
    }

    /** Query with filters */
    async queryFiltered(params: {
        collection: string;
        vector?: number[];
        filter?: any;
        limit?: number;
    }) {
        const { collection, vector, filter, limit = 100 } = params;
        return this.client.query(collection, {
            query: vector,
            filter,
            limit,
            with_payload: true,
        });
    }

    /** List all collections */
    async getCollections() {
        return this.client.getCollections();
    }

    /** Scroll all points */
    async scroll(collectionName: string, limit = 10_000) {
        return this.client.scroll(collectionName, { limit });
    }
}
