# AGENT.md

Documentation of AI-assisted development for the Lead Tracker Application.

## AI Tools Used
- **Claude** 
- **ChatGPT** 

## Prompts
User prompts given to Claude, in order, that produced the current codebase:

1. > Consider yourself as react developer and provide a sample ui preview. 
   > This contains list leads, update status of leads and serach leads, create leads. 
   > Provide a nice ui. Give the ui preview.

## AI-Generated Sections
- Basic design options and inspirations
- Filter by status
- Pagination

## Manually Written Sections
- Create Lead API integration
- Fetching and displaying leads
- Search and filter API integration
- Lead status update API integration
- Toast notifications
  values.
- **`created_at` set via `DEFAULT now()`**, not accepted from the client,
  so creation time can't be spoofed by the API caller.
