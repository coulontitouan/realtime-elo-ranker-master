import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Realtime Elo Ranker (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('POST /player - doit créer un joueur', () => {
        const newPlayer = { id: 'newPlayer' };

        return request(app.getHttpServer())
            .post('/api/player')
            .send(newPlayer)
            .expect(201)
            .expect((response) => {
                expect(response.body).toEqual({ id: 'newPlayer', rank: 0 });
            });
    });

    it('GET /player/:id - doit récupérer un joueur existant', () => {
        const playerId = 'newPlayer';
        return request(app.getHttpServer())
            .get(`/api/player/${playerId}`)
            .expect(200)
            .expect({ id: playerId, rank: 0 });
    });

    it('POST /player - doit retourner un conflit si le joueur existe déjà', () => {
        const existingPlayer = { id: 'newPlayer' };

        return request(app.getHttpServer())
            .post('/api/player')
            .send(existingPlayer)
            .expect(409);
    });

    it('DELETE /player/:id - doit supprimer un joueur', () => {
        const playerId = 'newPlayer';

        return request(app.getHttpServer())
            .delete(`/api/player/${playerId}`)
            .expect(200)
            .expect({ id: playerId, rank: 0 });
    });

    it('GET /ranking - doit récupérer tous les joueurs', () => {
        return request(app.getHttpServer())
            .get('/api/ranking')
            .expect(200)
            .expect((response) => {
                expect(Array.isArray(response.body)).toBe(true);
                expect(response.body.length).toBeGreaterThan(0);
            });
    });

    it('POST /match - doit simuler un match et calculer les classements Elo', () => {
        const matchResult = { winner: 'player1', loser: 'player2', draw: false };

        return request(app.getHttpServer())
            .post('/api/match')
            .send(matchResult)
            .expect(201)
            .expect((response) => {
                expect(response.body).toHaveProperty('winner');
                expect(response.body).toHaveProperty('loser');
            });
    });

    afterAll(async () => {
        await app.close();
    });
});