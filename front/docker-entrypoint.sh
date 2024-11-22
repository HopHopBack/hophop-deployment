#!/bin/sh

# Wait for the backend to be available
./wait-for-it.sh back:8000 --timeout=60 --strict -- echo "Backend is up"

# Build the Next.js site (including static-site generation)
npm run build

# Start the production server
exec npm run start
