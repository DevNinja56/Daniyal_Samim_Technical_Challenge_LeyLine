# Settlement System

This project implements a settlement system that allows Party A to submit, modify, and resubmit settlement amounts until Party B either agrees or disputes the amount. The system ensures real-time updates across different user interfaces without requiring a page refresh, using JSON Server for backend simulation and React with Redux for state management.

## Features

- **Initial Submission**: Party A can submit a settlement amount.
- **Real-time Updates**: Changes are updated in real-time across different sessions using polling mechanisms.
- **Modification and Resubmission**: Party A can modify the submitted amount any number of times until Party B responds.
- **Dispute and Agreement Handling**: Party B can either agree with the amount or dispute it.
- **Success Screen**: Displays a success screen to both parties when Party B agrees to an amount.
- **Responsive UI**: The UI updates reflect immediately across all client interfaces without manual refresh.

## Technology Stack

- **Frontend**: React.js
- **State Management**: Redux with Redux Toolkit
- **Backend Simulation**: JSON Server
- **Styling**: Tailwind CSS

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

```bash
npm install
npm run start-dev
```
