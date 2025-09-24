// Page to Audio Timestamp Mapping for Ruskin Bond Essential Collection
// This maps specific pages to exact audio timestamps for seamless switching

export interface PageAudioMapping {
  page: number;
  audioTimestamp: number; // in seconds
  chapter?: string;
  description?: string;
}

// For "The Essential Collection for Young Readers" by Ruskin Bond
// This is a sample mapping - in production, this would be generated from:
// 1. AI analysis of the text and audio
// 2. Manual synchronization by content creators
// 3. User feedback and corrections
export const ruskinBondMapping: PageAudioMapping[] = [
  // Sample mapping for first 60 pages (you can expand this)
  { page: 1, audioTimestamp: 0, chapter: "Cover & Title", description: "Book begins" },
  { page: 5, audioTimestamp: 45, chapter: "Table of Contents", description: "Contents listing" },
  { page: 8, audioTimestamp: 78, chapter: "Introduction", description: "Author's introduction" },
  { page: 12, audioTimestamp: 125, chapter: "The Blue Umbrella", description: "Story begins" },
  { page: 18, audioTimestamp: 198, chapter: "The Blue Umbrella", description: "Binya meets the umbrella" },
  { page: 25, audioTimestamp: 285, chapter: "The Blue Umbrella", description: "Village reactions" },
  { page: 32, audioTimestamp: 378, chapter: "The Blue Umbrella", description: "Story climax" },
  { page: 38, audioTimestamp: 445, chapter: "The Blue Umbrella", description: "Story resolution" },
  { page: 42, audioTimestamp: 512, chapter: "Rusty Runs Away", description: "New story begins" },
  { page: 49, audioTimestamp: 598, chapter: "Rusty Runs Away", description: "Rusty's adventure starts" },
  { page: 55, audioTimestamp: 678, chapter: "Rusty Runs Away", description: "Meeting new friends" },
  { page: 62, audioTimestamp: 765, chapter: "Rusty Runs Away", description: "Adventure continues" },
  { page: 68, audioTimestamp: 845, chapter: "The Room on the Roof", description: "Another story begins" },
  { page: 75, audioTimestamp: 925, chapter: "The Room on the Roof", description: "Rusty's new life" },
  { page: 82, audioTimestamp: 1012, chapter: "The Room on the Roof", description: "Friendship develops" },
  { page: 89, audioTimestamp: 1098, chapter: "The Room on the Roof", description: "Life lessons" },
  { page: 95, audioTimestamp: 1175, chapter: "A Flight of Pigeons", description: "New story begins" },
  { page: 102, audioTimestamp: 1258, chapter: "A Flight of Pigeons", description: "Historical setting" },
  { page: 108, audioTimestamp: 1335, chapter: "A Flight of Pigeons", description: "Characters introduced" },
  { page: 115, audioTimestamp: 1420, chapter: "A Flight of Pigeons", description: "Plot develops" },
  { page: 122, audioTimestamp: 1505, chapter: "A Flight of Pigeons", description: "Story continues" },
  { page: 128, audioTimestamp: 1585, chapter: "A Flight of Pigeons", description: "Climax approaches" },
  { page: 135, audioTimestamp: 1670, chapter: "A Flight of Pigeons", description: "Story resolution" },
  { page: 142, audioTimestamp: 1755, chapter: "The Night Train at Deoli", description: "New story begins" },
  { page: 148, audioTimestamp: 1835, chapter: "The Night Train at Deoli", description: "Meeting on train" },
  { page: 149, audioTimestamp: 3500, chapter: "End", description: "Book concludes" }
];

// Helper functions for mapping
export const getAudioTimeForPage = (page: number): number => {
  // Find exact match first
  const exactMatch = ruskinBondMapping.find(mapping => mapping.page === page);
  if (exactMatch) {
    return exactMatch.audioTimestamp;
  }

  // If no exact match, find the closest pages and interpolate
  const sortedMapping = ruskinBondMapping.sort((a, b) => a.page - b.page);
  
  // Find the two closest pages
  let beforePage = null;
  let afterPage = null;
  
  for (let i = 0; i < sortedMapping.length; i++) {
    if (sortedMapping[i].page < page) {
      beforePage = sortedMapping[i];
    } else if (sortedMapping[i].page > page && !afterPage) {
      afterPage = sortedMapping[i];
      break;
    }
  }
  
  // If we have both before and after pages, interpolate
  if (beforePage && afterPage) {
    const pageDiff = afterPage.page - beforePage.page;
    const timeDiff = afterPage.audioTimestamp - beforePage.audioTimestamp;
    const pageRatio = (page - beforePage.page) / pageDiff;
    return beforePage.audioTimestamp + (timeDiff * pageRatio);
  }
  
  // If only before page exists, extrapolate forward
  if (beforePage) {
    const avgTimePerPage = 12; // Average seconds per page based on mapping
    return beforePage.audioTimestamp + ((page - beforePage.page) * avgTimePerPage);
  }
  
  // If only after page exists, extrapolate backward
  if (afterPage) {
    const avgTimePerPage = 12; // Average seconds per page based on mapping
    return afterPage.audioTimestamp - ((afterPage.page - page) * avgTimePerPage);
  }
  
  // Fallback: linear estimation based on total duration
  const totalPages = 149;
  const totalDuration = 5400; // 1.5 hours
  return (page / totalPages) * totalDuration;
};

export const getPageForAudioTime = (audioTime: number): number => {
  // Find exact match first
  const exactMatch = ruskinBondMapping.find(mapping => 
    Math.abs(mapping.audioTimestamp - audioTime) < 5 // Within 5 seconds
  );
  if (exactMatch) {
    return exactMatch.page;
  }

  // Find the two closest timestamps and interpolate
  const sortedMapping = ruskinBondMapping.sort((a, b) => a.audioTimestamp - b.audioTimestamp);
  
  let beforeTime = null;
  let afterTime = null;
  
  for (let i = 0; i < sortedMapping.length; i++) {
    if (sortedMapping[i].audioTimestamp < audioTime) {
      beforeTime = sortedMapping[i];
    } else if (sortedMapping[i].audioTimestamp > audioTime && !afterTime) {
      afterTime = sortedMapping[i];
      break;
    }
  }
  
  // If we have both before and after times, interpolate
  if (beforeTime && afterTime) {
    const timeDiff = afterTime.audioTimestamp - beforeTime.audioTimestamp;
    const pageDiff = afterTime.page - beforeTime.page;
    const timeRatio = (audioTime - beforeTime.audioTimestamp) / timeDiff;
    return Math.round(beforeTime.page + (pageDiff * timeRatio));
  }
  
  // If only before time exists, extrapolate forward
  if (beforeTime) {
    const avgTimePerPage = 12; // Average seconds per page based on mapping
    return Math.round(beforeTime.page + ((audioTime - beforeTime.audioTimestamp) / avgTimePerPage));
  }
  
  // If only after time exists, extrapolate backward
  if (afterTime) {
    const avgTimePerPage = 12; // Average seconds per page based on mapping
    return Math.round(afterTime.page - ((afterTime.audioTimestamp - audioTime) / avgTimePerPage));
  }
  
  // Fallback: linear estimation
  const totalDuration = 5400; // 1.5 hours
  const totalPages = 149;
  return Math.round((audioTime / totalDuration) * totalPages);
};

// Get chapter information for a given page
export const getChapterForPage = (page: number): string => {
  const mapping = ruskinBondMapping.find(m => m.page === page);
  return mapping?.chapter || "Unknown Chapter";
};

// Get chapter information for a given audio time
export const getChapterForAudioTime = (audioTime: number): string => {
  const mapping = ruskinBondMapping.find(m => 
    Math.abs(m.audioTimestamp - audioTime) < 30 // Within 30 seconds
  );
  return mapping?.chapter || "Unknown Chapter";
};
