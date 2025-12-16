# Auntie Margie's Daily List 💚

A warm, friendly Progressive Web App designed to help Auntie Margie stay organised and connected with family.

## What's Included

- **index.html** - The main app for Margie
- **family-portal.html** - Separate page for family to add events and view journal
- **manifest.json** - Makes it installable as an app
- **sw.js** - Service worker for offline functionality
- **icon-192.png & icon-512.png** - App icons

## How to Use

### Quick Demo (Easiest)
Simply open `index.html` in a web browser to try it out locally.

### Installing on Margie's iPhone

For the full experience with notifications and home screen installation, you'll need to host these files on a web server with HTTPS. Here are some free options:

1. **GitHub Pages** (Free)
   - Create a GitHub repository
   - Upload all these files
   - Enable GitHub Pages in repository settings
   - Share the link with Margie

2. **Netlify** (Free)
   - Go to netlify.com
   - Drag and drop this folder to deploy
   - Get a free HTTPS URL

3. **Vercel** (Free)
   - Similar to Netlify
   - Very quick deployment

Once hosted, on Margie's iPhone:
1. Open Safari and go to your hosted URL
2. Tap the Share button (square with arrow)
3. Tap "Add to Home Screen"
4. Name it "Margie's List" and tap Add

Now it'll look and feel like a real app!

## Family Portal

The family portal is at `/family-portal.html`

**Default login code:** `*********`

(Change this in the family-portal.html file - search for `FAMILY_CODE`)

Family members can:
- Add appointments and events for Margie
- View her daily journal entries
- See upcoming events

## Customisation

### Change the Family Code
In `family-portal.html`, find this line and change it:
```javascript
const FAMILY_CODE = '**********';
```

### Change Friendly Messages
In `index.html`, find the `friendlyMessages` array to add or change the rotating messages Margie sees.

### Adjust Colours
Both files use CSS variables at the top. The main colour is `--primary: #5B8A72` (a calm sage green).

## Features

✅ Large, easy-to-read text (adjustable size)
✅ Simple one-screen layout
✅ Today's events at a glance
✅ Week ahead view showing upcoming events
✅ Voice journaling with transcription
✅ Morning reminders of the day ahead
✅ 1-hour alerts before events
✅ Family can add events remotely
✅ Works offline once installed
✅ Warm, friendly tone throughout

## Next Steps

For a production version, you'd want to:
1. Set up a simple backend server to sync data between Margie's app and the family portal
2. Add proper user authentication
3. Connect to an AI service (like Claude API) for smarter journal summaries
4. Integrate with Apple Calendar for two-way sync

---

Made with 💚 for Auntie Margie
