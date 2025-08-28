// Example cosmetic data (should match your inventory.js and assets)
const cosmetics = [
  { id: 'red_blook', name: 'Red Blook', rarity: 'common', image: 'assets/red_blook.png', weight: 60 },
  { id: 'blue_blook', name: 'Blue Blook', rarity: 'rare', image: 'assets/blue_blook.png', weight: 30 },
  { id: 'epic_face', name: 'Epic Face', rarity: 'epic', image: 'assets/blue_blook.png', weight: 17 },
  { id: 'golden_blook', name: 'Golden Blook', rarity: 'legendary', image: 'assets/golden_blook.png', weight: 10 },
];

// Weighted random selection
function pickRandomCosmetic() {
  const totalWeight = cosmetics.reduce((sum, c) => sum + c.weight, 0);
  let r = Math.random() * totalWeight;
  for (const c of cosmetics) {
    if (r < c.weight) return c;
    r -= c.weight;
  }
  return cosmetics[0];
}

// Inventory helpers
function getInventory() {
  const inv = localStorage.getItem('inventory');
  return inv ? JSON.parse(inv) : {};
}

function setInventory(inv) {
  localStorage.setItem('inventory', JSON.stringify(inv));
}

function addToInventory(cosmeticId) {
  const inv = getInventory();
  inv[cosmeticId] = (inv[cosmeticId] || 0) + 1;
  setInventory(inv);
}

// UI logic
const openBtn = document.getElementById('open-case-btn');
const rewardSection = document.getElementById('reward-section');
const rewardImg = document.getElementById('reward-img');
const rewardName = document.getElementById('reward-name');
const rewardRarity = document.getElementById('reward-rarity');
const openAnotherBtn = document.getElementById('open-another-btn');
const caseDisplay = document.querySelector('.case-display');

function showReward(cosmetic) {
  rewardImg.src = cosmetic.image;
  rewardName.textContent = cosmetic.name;
  rewardRarity.textContent = cosmetic.rarity.charAt(0).toUpperCase() + cosmetic.rarity.slice(1);
  rewardRarity.className = 'reward-rarity ' + cosmetic.rarity;
  rewardSection.style.display = '';
  caseDisplay.style.display = 'none';
}

function resetSimulator() {
  rewardSection.style.display = 'none';
  caseDisplay.style.display = '';
}

// Open case handler
openBtn.onclick = function() {
  const cosmetic = pickRandomCosmetic();
  addToInventory(cosmetic.id);
  showReward(cosmetic);
};

openAnotherBtn.onclick = function() {
  resetSimulator();
};
