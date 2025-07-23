# Copilot Instructions for Petys Restaurant Waiter App

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Context
This is a React TypeScript application designed for restaurant waiters to take orders on tablets and send them to the kitchen via WhatsApp.

## Key Requirements
- Tablet-optimized interface with large touch targets
- Product menu display with categories
- Order taking functionality with table number and waiter name
- WhatsApp integration for sending orders to kitchen
- Clean, simple UI suitable for restaurant environment
- Fast performance for busy restaurant operations

## Code Style Guidelines
- Use TypeScript for type safety
- Follow React best practices with functional components and hooks
- Use CSS modules or styled components for styling
- Implement responsive design optimized for tablet screens
- Keep components modular and reusable
- Use semantic HTML for accessibility

## Business Logic
- Orders should include: table number, waiter name, items with quantities, total price
- WhatsApp messages should be formatted clearly for kitchen staff
- Support for different product categories (appetizers, main courses, drinks, desserts)
- Handle order modifications and cancellations
- Track order status and timing
