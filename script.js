// ===== Book for Peace - Main JavaScript =====

// Global state
let selectedEmoji = '🕊️';
let messages = [];
const STORAGE_KEY = 'bookforpeace_messages';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadMessages();
    updateCounters();
    setupEventListeners();
    startMessageRotation();
    initCharCounter();
});

// Load messages from localStorage
function loadMessages() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            messages = JSON.parse(stored);
        } catch (e) {
            messages = getDefaultMessages();
        }
    } else {
        messages = getDefaultMessages();
        saveMessages();
    }
    
    // Update recent lights display
    updateRecentLights();
}

// Default messages
function getDefaultMessages() {
    return [
        { id: '1', emoji: '🎁', message: 'Sending peace and love to everyone 🌍', author: 'Anonymous', location: 'Global', timestamp: Date.now() - 120000, type: 'personal' },
        { id: '2', emoji: '🕊️', message: 'May all beings be happy and free', author: 'Sarah', location: 'London, UK', timestamp: Date.now() - 900000, type: 'personal' },
        { id: '3', emoji: '☮️', message: 'Peace within, peace without', author: 'Michael', location: 'Tokyo, Japan', timestamp: Date.now() - 3600000, type: 'personal' },
        { id: '4', emoji: '💖', message: 'Family is where peace begins', author: 'The Johnsons', location: 'Sydney, AU', timestamp: Date.now() - 7200000, type: 'family' },
        { id: '5', emoji: '🌈', message: 'Hope for peace in every corner of the world', author: 'Maya', location: 'Cape Town, SA', timestamp: Date.now() - 10800000, type: 'personal' },
        { id: '6', emoji: '🌟', message: 'Together we shine brighter', author: 'Peace Collective', location: 'Berlin, DE', timestamp: Date.now() - 14400000, type: 'group' }
    ];
}

// Save messages to localStorage
function saveMessages() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

// Update recent lights display
function updateRecentLights() {
    const container = document.getElementById('recentLights');
    if (!container) return;
    
    const recent = [...messages]
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5);
    
    container.innerHTML = recent.map(msg => `
        <div class="light-item">
            <span class="light-emoji">${msg.emoji}</span>
            <div class="light-content">
                <p class="light-message">${escapeHtml(msg.message
