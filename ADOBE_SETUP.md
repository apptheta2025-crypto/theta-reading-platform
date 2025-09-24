# Adobe PDF Embed API Setup

## Getting Your Adobe Client ID

1. **Visit Adobe PDF Embed API Page**
   - Go to: https://developer.adobe.com/document-services/apis/pdf-embed
   - Click "Get Started" or "Sign Up"

2. **Create Adobe Account**
   - Sign up for a free Adobe account if you don't have one
   - Complete the registration process

3. **Get Your Client ID**
   - After signing up, you'll receive a unique Client ID
   - This is free and includes 1000 PDF views per month

4. **Update the Code**
   - Replace `YOUR_ADOBE_CLIENT_ID` in `src/pages/TruePageByPageReader.tsx` with your actual Client ID
   - Look for line 67: `clientId: "YOUR_ADOBE_CLIENT_ID"`

## Features You Get

### ✅ Professional PDF Viewing
- High-quality PDF rendering
- Zoom, pan, and navigation
- Full-screen mode
- Print and download

### ✅ Advanced Highlighting & Annotations
- Text selection and highlighting
- Multiple highlight colors
- Comments and notes
- Sticky notes
- Drawing tools

### ✅ User Progress Tracking
- Page view tracking
- Annotation tracking
- Reading time analytics
- Bookmark usage

### ✅ Integration Capabilities
- Real-time progress updates
- Custom event callbacks
- User behavior analytics
- Seamless web app integration

## Event Callbacks Available

The implementation includes these tracking callbacks:

- **Page View**: Track which page user is reading
- **Annotation Added**: Track when user highlights/adds notes
- **Annotation Deleted**: Track annotation removal
- **Bookmark Clicked**: Track bookmark usage
- **Document Download**: Track download requests

## Example Usage

```javascript
// Track user progress
adobeDCView.registerCallback(
  window.AdobeDC.View.Enum.CallbackType.PAGE_VIEW,
  function(event) {
    // Send to your backend API
    fetch('/api/reading-progress', {
      method: 'POST',
      body: JSON.stringify({
        userId: currentUser.id,
        bookId: ebook.id,
        currentPage: event.data.pageNumber,
        timestamp: new Date().toISOString()
      })
    });
  },
  {}
);
```

## Benefits

- **Professional Quality**: Same engine as Adobe Acrobat
- **No Complex Implementation**: Adobe handles all the PDF complexity
- **Built-in Analytics**: Track user engagement automatically
- **Cross-Platform**: Works on all devices and browsers
- **Free Tier**: 1000 views/month at no cost
