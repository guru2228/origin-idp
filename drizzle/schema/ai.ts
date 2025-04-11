import { pgTable, uuid, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { workspaces, statusEnum } from './index';
import { teams } from './index';

// AI Studio
export const aiModels = pgTable('ai_models', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  provider: text('provider').notNull(),
  version: text('version').notNull(),
  type: text('type').notNull(),
  capabilities: jsonb('capabilities'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const aiAgents = pgTable('ai_agents', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  modelId: uuid('model_id').notNull().references(() => aiModels.id),
  type: text('type').notNull(),
  config: jsonb('config'),
  status: statusEnum('status').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const vectorStores = pgTable('vector_stores', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  embeddingModelId: uuid('embedding_model_id').notNull().references(() => aiModels.id),
  config: jsonb('config'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const ragPipelines = pgTable('rag_pipelines', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  vectorStoreId: uuid('vector_store_id').notNull().references(() => vectorStores.id),
  modelId: uuid('model_id').notNull().references(() => aiModels.id),
  config: jsonb('config'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const mcpServers = pgTable('mcp_servers', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  endpointUrl: text('endpoint_url').notNull(),
  apiKey: text('api_key'),
  config: jsonb('config'),
  status: statusEnum('status').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// Knowledge Base with pgvector
export const knowledgeBases = pgTable('knowledge_bases', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  vectorStoreId: uuid('vector_store_id').references(() => vectorStores.id),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const knowledgeBaseDocuments = pgTable('knowledge_base_documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  knowledgeBaseId: uuid('knowledge_base_id').notNull().references(() => knowledgeBases.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  content: text('content'),
  fileUrl: text('file_url'),
  fileType: text('file_type'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const documentChunks = pgTable('document_chunks', {
  id: uuid('id').primaryKey().defaultRandom(),
  documentId: uuid('document_id').notNull().references(() => knowledgeBaseDocuments.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  embedding: text('embedding'), // This will be handled by pgvector extension
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// Relations
export const aiModelsRelations = relations(aiModels, ({ many }) => ({
  aiAgents: many(aiAgents),
  vectorStores: many(vectorStores),
  ragPipelines: many(ragPipelines),
}));

export const aiAgentsRelations = relations(aiAgents, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [aiAgents.workspaceId],
    references: [workspaces.id],
  }),
  model: one(aiModels, {
    fields: [aiAgents.modelId],
    references: [aiModels.id],
  }),
}));

export const vectorStoresRelations = relations(vectorStores, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [vectorStores.workspaceId],
    references: [workspaces.id],
  }),
  embeddingModel: one(aiModels, {
    fields: [vectorStores.embeddingModelId],
    references: [aiModels.id],
  }),
  ragPipelines: many(ragPipelines),
  knowledgeBases: many(knowledgeBases),
}));

export const knowledgeBasesRelations = relations(knowledgeBases, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [knowledgeBases.workspaceId],
    references: [workspaces.id],
  }),
  vectorStore: one(vectorStores, {
    fields: [knowledgeBases.vectorStoreId],
    references: [vectorStores.id],
  }),
  documents: many(knowledgeBaseDocuments),
}));

export const knowledgeBaseDocumentsRelations = relations(knowledgeBaseDocuments, ({ one, many }) => ({
  knowledgeBase: one(knowledgeBases, {
    fields: [knowledgeBaseDocuments.knowledgeBaseId],
    references: [knowledgeBases.id],
  }),
  chunks: many(documentChunks),
}));

export const documentChunksRelations = relations(documentChunks, ({ one }) => ({
  document: one(knowledgeBaseDocuments, {
    fields: [documentChunks.documentId],
    references: [knowledgeBaseDocuments.id],
  }),
}));
