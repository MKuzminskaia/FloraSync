# FloraSync

[![CI](https://github.com/MKuzminskaia/FloraSync/actions/workflows/ci.yml/badge.svg)](https://github.com/MKuzminskaia/FloraSync/actions/workflows/ci.yml)

A React Native mobile app for managing houseplants - a solo personal
project built to explore modern mobile development with TypeScript,
Expo, and local SQLite.

![FloraSync demo](assets/demo.gif)

## Status

Stage 1 (Basic MVP) - in active development.

**Working:**

- SQLite schema with foreign key integrity, CHECK constraints, cascade deletes
- Repository pattern isolating UI from data source
- Custom React hooks as data access layer
- Full CRUD flow for plants and watering log
- Toast notifications, Stack navigation
- Unit tests : Jest + jest-expo, 18 tests covering the schedule logic
- CI: GitHub Actions running typecheck, lint and tests on every push

**In progress:**

- Local notifications

## Tech Stack

- TypeScript + React Native (Expo SDK 54)
- expo-router (Stack navigation)
- expo-sqlite (local persistence)
- NativeWind (styling)
- React Native Reusables (UI components)

## Architecture

- Database opened once as a singleton module, not through a provider
- All data access goes through repositories and hooks. Screens never touch SQLite
- Watering type guarded in three layers: TypeScript union, SQL CHECK, shared constant
- A separate table per care-event type, not one shared log
- Pure schedule functions. Current time passed in as a parameter

## Running Locally

Requires Node.js and Expo Go app on a physical device.

    npm install
    npx expo start

Scan QR code with Expo Go (iPhone or Android).

## Motivation

Personal portfolio project. Built to solve my own problem (managing
plants across two locations) while learning React Native, TypeScript,
and mobile development practices from scratch.
