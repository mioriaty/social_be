/**
 * Main entry point for the TEDU application
 */

// Example function with TypeScript types
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Example async function
async function main(): Promise<void> {
  console.log(greet('TEDU User'));
  console.log('Node.js TypeScript project initialized successfully!');
}

// Run the main function
main().catch(error => {
  console.error('An error occurred:', error);
  process.exit(1);
});
