import { pgTable, uuid, text, timestamp, jsonb, decimal, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { workspaces, statusEnum, users } from './index';

// Engineering Metrics
export const metricDefinitions = pgTable('metric_definitions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  displayName: text('display_name').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  unit: text('unit'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const metricDataPoints = pgTable('metric_data_points', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  metricId: uuid('metric_id').notNull().references(() => metricDefinitions.id),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
  value: decimal('value', { precision: 20, scale: 5 }).notNull(),
  dimensions: jsonb('dimensions'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const dashboardConfigs = pgTable('dashboard_configs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  layout: jsonb('layout').notNull(),
  isDefault: boolean('is_default').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const dashboardWidgets = pgTable('dashboard_widgets', {
  id: uuid('id').primaryKey().defaultRandom(),
  dashboardId: uuid('dashboard_id').notNull().references(() => dashboardConfigs.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  type: text('type').notNull(),
  config: jsonb('config').notNull(),
  position: jsonb('position').notNull(),
  size: jsonb('size').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// Spectrum - AI Infused SDLC
export const storygraftConversations = pgTable('storygraft_conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  status: statusEnum('status').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const storygraftMessages = pgTable('storygraft_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').notNull().references(() => storygraftConversations.id, { onDelete: 'cascade' }),
  role: text('role').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const storygraftOutputs = pgTable('storygraft_outputs', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').notNull().references(() => storygraftConversations.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  content: jsonb('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const rapidstackConversations = pgTable('rapidstack_conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  status: statusEnum('status').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const rapidstackMessages = pgTable('rapidstack_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').notNull().references(() => rapidstackConversations.id, { onDelete: 'cascade' }),
  role: text('role').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const rapidstackOutputs = pgTable('rapidstack_outputs', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').notNull().references(() => rapidstackConversations.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  content: jsonb('content').notNull(),
  githubRepoUrl: text('github_repo_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// Relations
export const metricDefinitionsRelations = relations(metricDefinitions, ({ many }) => ({
  dataPoints: many(metricDataPoints),
}));

export const metricDataPointsRelations = relations(metricDataPoints, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [metricDataPoints.workspaceId],
    references: [workspaces.id],
  }),
  definition: one(metricDefinitions, {
    fields: [metricDataPoints.metricId],
    references: [metricDefinitions.id],
  }),
}));

export const dashboardConfigsRelations = relations(dashboardConfigs, ({ one, many }) => ({
  user: one(users, {
    fields: [dashboardConfigs.userId],
    references: [users.id],
  }),
  workspace: one(workspaces, {
    fields: [dashboardConfigs.workspaceId],
    references: [workspaces.id],
  }),
  widgets: many(dashboardWidgets),
}));

export const dashboardWidgetsRelations = relations(dashboardWidgets, ({ one }) => ({
  dashboard: one(dashboardConfigs, {
    fields: [dashboardWidgets.dashboardId],
    references: [dashboardConfigs.id],
  }),
}));

export const storygraftConversationsRelations = relations(storygraftConversations, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [storygraftConversations.workspaceId],
    references: [workspaces.id],
  }),
  user: one(users, {
    fields: [storygraftConversations.userId],
    references: [users.id],
  }),
  messages: many(storygraftMessages),
  outputs: many(storygraftOutputs),
}));

export const rapidstackConversationsRelations = relations(rapidstackConversations, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [rapidstackConversations.workspaceId],
    references: [workspaces.id],
  }),
  user: one(users, {
    fields: [rapidstackConversations.userId],
    references: [users.id],
  }),
  messages: many(rapidstackMessages),
  outputs: many(rapidstackOutputs),
}));
