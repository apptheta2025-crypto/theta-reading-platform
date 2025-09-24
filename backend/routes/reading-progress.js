const express = require('express');
const router = express.Router();

// In-memory storage for demo (replace with database in production)
const readingProgress = new Map();

// Save reading progress
router.post('/', async (req, res) => {
  try {
    const { bookId, userId, pageNumber, progress, position, timestamp } = req.body;
    
    // Validate required fields
    if (!bookId || !userId || pageNumber === undefined || progress === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Store progress
    const progressKey = `${userId}-${bookId}`;
    readingProgress.set(progressKey, {
      bookId,
      userId,
      pageNumber,
      progress,
      position,
      timestamp,
      updatedAt: new Date().toISOString()
    });
    
    console.log('Reading progress saved:', {
      bookId,
      userId,
      pageNumber,
      progress,
      position
    });
    
    res.json({ 
      success: true, 
      message: 'Reading progress saved successfully',
      data: {
        bookId,
        userId,
        pageNumber,
        progress,
        position,
        timestamp
      }
    });
  } catch (error) {
    console.error('Error saving reading progress:', error);
    res.status(500).json({ error: 'Failed to save reading progress' });
  }
});

// Get reading progress
router.get('/:userId/:bookId', async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const progressKey = `${userId}-${bookId}`;
    
    const savedProgress = readingProgress.get(progressKey);
    
    if (!savedProgress) {
      return res.json({ 
        success: true, 
        data: null,
        message: 'No reading progress found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: savedProgress 
    });
  } catch (error) {
    console.error('Error getting reading progress:', error);
    res.status(500).json({ error: 'Failed to get reading progress' });
  }
});

// Get all reading progress for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const userProgress = [];
    for (const [key, value] of readingProgress.entries()) {
      if (key.startsWith(`${userId}-`)) {
        userProgress.push(value);
      }
    }
    
    res.json({ 
      success: true, 
      data: userProgress 
    });
  } catch (error) {
    console.error('Error getting user reading progress:', error);
    res.status(500).json({ error: 'Failed to get user reading progress' });
  }
});

// Delete reading progress
router.delete('/:userId/:bookId', async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const progressKey = `${userId}-${bookId}`;
    
    const deleted = readingProgress.delete(progressKey);
    
    res.json({ 
      success: true, 
      message: deleted ? 'Reading progress deleted' : 'No progress found to delete' 
    });
  } catch (error) {
    console.error('Error deleting reading progress:', error);
    res.status(500).json({ error: 'Failed to delete reading progress' });
  }
});

module.exports = router;
