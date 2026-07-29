# FloraSync

A React Native mobile app for managing houseplants - a solo personal 
project built to explore modern mobile development with TypeScript, 
Expo, and local SQLite.

## Status

Stage 1 (Basic MVP) - in active development.

**Working:**
- SQLite schema with foreign key integrity, CHECK constraints, cascade deletes
- Repository pattern isolating UI from data source
- Custom React hooks as data access layer
- Full CRUD flow for plants and watering log
- Toast notifications, Stack navigation

**In progress:**
- Unit tests (Jest + React Native Testing Library)
- CI/CD (GitHub Actions)
- Local notifications

## Tech Stack

- TypeScript + React Native (Expo SDK 54)
- expo-router (Stack navigation)
- expo-sqlite (local persistence)
- NativeWind (styling)
- React Native Reusables (UI components)

## Architecture

The project follows a repository pattern with clean separation between 
UI, data access layer (custom hooks), and persistence (SQLite). 
Design decisions are documented in `docs/decisions-plant-care-app.md` 
as an Architecture Decision Record (ADR).

## Running Locally

Requires Node.js and Expo Go app on a physical device.

    npm install
    npx expo start

Scan QR code with Expo Go (iPhone or Android).

## Motivation

Personal portfolio project. Built to solve my own problem (managing 
plants across two locations) while learning React Native, TypeScript, 
and mobile development practices from scratch.
