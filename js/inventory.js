// Example cosmetic data (replace with your own or import from data.js)
const cosmetics = [
  { id: 'red_blook', name: 'Red Blook', rarity: 'common', image: 'assets/red_blook.png' },
  { id: 'blue_blook', name: 'Blue Blook', rarity: 'rare', image: 'assets/blue_blook.png' },
  { id: 'golden_blook', name: 'Golden Blook', rarity: 'legendary', image: 'assets/golden_blook.png' },
];

// Utility to get inventory from localStorage
function getInventory() {
  const inv = localStorage.getItem('inventory');
  return inv ? JSON.parse(inv) : {};
}

// Utility to get cosmetic by id
function getCosmeticById(id) {
  return cosmetics.find(c => c.id === id);
}

// Render inventory
function renderInventory() {
  const inventory = getInventory();
  const content = document.getElementById('inventory-content');
  content.innerHTML = '';

  let hasAny = false;

  // For each owned cosmetic, show it
  Object.keys(inventory).forEach(id => {
    const amount = inventory[id];
    if (amount > 0) {
      hasAny = true;
      const cosmetic = getCosmeticById(id);
      if (cosmetic) {
        const div = document.createElement('div');
        div.className = 'inventory-item';
        div.innerHTML = `
          <img src="${cosmetic.image}" alt="${cosmetic.name}">
          <div class="item-name">${cosmetic.name}</div>
          <div class="item-rarity">${cosmetic.rarity}</div>
          <div class="item-amount">x${amount}</div>
        `;
        content.appendChild(div);
      }
    }
  });

  if (!hasAny) {
    content.innerHTML = `<div style="color:#fff8;font-size:1.2rem;margin:36px auto;">No cosmetics yet. Open some cases!</div>`;
  }
}

renderInventory();
