# Gym Membership Billing System

## Overview

This project is a backend system designed to manage gym memberships, including handling various billing structures, optional add-on services, and sending out email reminders for upcoming payments. The system uses Node.js, Express, Sequelize, PostgreSQL, and Joi for data validation.

## Features

- **Membership Management**: Create and manage gym memberships with different billing structures (annual or monthly).
- **Add-On Services**: Manage optional add-on services with separate monthly charges.
- **Invoice Management**: Generate and manage invoices for memberships and add-on services.
- **Email Reminders**: Send email reminders for upcoming payments using a cron job.
- **Validation**: Validate input data using Joi.

## Prerequisites

- Node.js
- PostgreSQL
- npm (Node Package Manager)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Beloved1310/gym-membership-billing
   cd gym-membership-billing
