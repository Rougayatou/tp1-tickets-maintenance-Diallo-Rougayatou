<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getTickets, type Ticket } from '../services/ticketService'

const tickets = ref<Ticket[]>([])
const recherche = ref('')
const statutChoisi = ref('')
const prioriteChoisie = ref('')
const chargement = ref(true)
const erreur = ref('')

async function chargerTickets() {
  try {
    tickets.value = await getTickets()
  } catch {
    erreur.value =
      'Impossible de charger les tickets. Vérifiez que JSON Server est démarré.'
  } finally {
    chargement.value = false
  }
}

const ticketsVisibles = computed(() => {
  return tickets.value.filter((ticket) => {
    const titreCorrespond =
      ticket.titre.toLowerCase().includes(recherche.value.toLowerCase())
    const statutCorrespond =
      statutChoisi.value === '' || ticket.statut === statutChoisi.value
    const prioriteCorrespond =
      prioriteChoisie.value === '' ||
      ticket.priorite === prioriteChoisie.value

    return titreCorrespond && statutCorrespond && prioriteCorrespond
  })
})

onMounted(() => {
  chargerTickets()
})
</script>

<template>
  <main class="page">
    <header class="en-tete">
      <div>
        <p class="sur-titre">CENTRE DE SUPPORT</p>
        <h1>Tickets de maintenance</h1>
        <p class="introduction">
          Suivez et consultez les incidents déclarés par les utilisateurs.
        </p>
      </div>
      <div class="statistique">
        <span class="statistique-nombre">{{ tickets.length }}</span>
        <span class="statistique-texte">tickets au total</span>
      </div>
    </header>

    <section class="filtres" aria-label="Recherche et filtres">
      <div class="filtres-titre">
        <h2>Rechercher un ticket</h2>
        <p>Utilisez les filtres pour affiner la liste.</p>
      </div>
      <label>
        <span>Recherche par titre</span>
        <input v-model="recherche" type="search" placeholder="Ex. : Wi-Fi" />
      </label>
      <label>
        <span>Statut</span>
        <select v-model="statutChoisi">
          <option value="">Tous les statuts</option>
          <option value="Ouvert">Ouvert</option>
          <option value="En cours">En cours</option>
          <option value="Résolu">Résolu</option>
        </select>
      </label>
      <label>
        <span>Priorité</span>
        <select v-model="prioriteChoisie">
          <option value="">Toutes les priorités</option>
          <option value="Haute">Haute</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Basse">Basse</option>
        </select>
      </label>
    </section>

    <p v-if="chargement" class="message">Chargement des tickets...</p>
    <p v-else-if="erreur" class="message erreur">{{ erreur }}</p>

    <template v-else>
      <div class="resultats">
        <h2>Liste des tickets</h2>
        <p class="compteur">{{ ticketsVisibles.length }} résultat(s)</p>
      </div>

      <p v-if="ticketsVisibles.length === 0" class="message">
        Aucun ticket ne correspond à votre recherche.
      </p>

      <section v-else class="liste-tickets">
        <article v-for="ticket in ticketsVisibles" :key="ticket.id" class="ticket">
          <div class="ticket-en-tete">
            <span class="ticket-id">#{{ ticket.id }}</span>
            <span class="badge statut">{{ ticket.statut }}</span>
          </div>
          <h2>{{ ticket.titre }}</h2>
          <p>{{ ticket.description }}</p>
          <div class="ticket-informations">
            <p><span>Demandeur</span>{{ ticket.demandeur }}</p>
            <p><span>Date de création</span>{{ ticket.dateCreation }}</p>
          </div>
          <div class="ticket-pied">
            <span class="priorite-point" :class="ticket.priorite.toLowerCase()"></span>
            <span class="priorite-texte">Priorité {{ ticket.priorite }}</span>
          </div>
        </article>
      </section>
    </template>
  </main>
</template>

<style scoped>
.page {
  max-width: 1180px;
  margin: 0 auto;
  padding: 48px 32px 64px;
  color: #172033;
  text-align: left;
}

.en-tete {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 36px;
}

.sur-titre {
  margin: 0 0 10px;
  color: #2563eb;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1.6px;
}

h1 {
  margin: 0;
  color: #172033;
  font-size: clamp(32px, 5vw, 46px);
  font-weight: 800;
  letter-spacing: -1px;
}

h2 {
  margin-top: 0;
  color: #172033;
  font-size: 18px;
}

.introduction {
  margin: 10px 0 0;
  color: #64748b;
  font-size: 16px;
}

.statistique {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 16px 20px;
  border: 1px solid #dbe5f1;
  border-radius: 12px;
  background: #fff;
}

.statistique-nombre {
  color: #2563eb;
  font-size: 28px;
  font-weight: 800;
}

.statistique-texte {
  color: #64748b;
  font-size: 13px;
}

.filtres {
  display: grid;
  grid-template-columns: minmax(210px, 1.3fr) 2fr 1fr 1fr;
  align-items: end;
  gap: 18px;
  margin-bottom: 40px;
  padding: 24px;
  border: 1px solid #dbe5f1;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 8px 24px rgb(30 64 175 / 6%);
}

.filtres-titre h2 {
  margin-bottom: 5px;
  font-size: 17px;
}

.filtres-titre p {
  margin: 0;
  color: #64748b;
  font-size: 13px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #475569;
  font-size: 13px;
  font-weight: 700;
}

input,
select {
  box-sizing: border-box;
  width: 100%;
  padding: 12px 13px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  outline: none;
  background: #f8fafc;
  color: #172033;
  font: inherit;
}

input:focus,
select:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgb(37 99 235 / 12%);
}

.resultats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.resultats h2 {
  margin: 0;
  font-size: 22px;
}

.compteur {
  margin: 0;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
}

.message {
  padding: 18px;
  border: 1px solid #dbe5f1;
  border-radius: 10px;
  background: #f3f4f6;
}

.erreur {
  background: #fee2e2;
  color: #991b1b;
}

.liste-tickets {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.ticket {
  display: flex;
  flex-direction: column;
  min-height: 245px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: white;
  box-shadow: 0 8px 20px rgb(15 23 42 / 5%);
  transition: transform 0.2s, box-shadow 0.2s;
}

.ticket:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 28px rgb(15 23 42 / 10%);
}

.ticket-en-tete {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.ticket-id {
  color: #94a3b8;
  font-size: 13px;
  font-weight: 700;
}

.badge {
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.statut {
  background: #dcfce7;
  color: #15803d;
}

.ticket > p {
  min-height: 48px;
  margin: 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
}

.ticket-informations {
  display: flex;
  gap: 28px;
  margin-top: 20px;
}

.ticket-informations p {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin: 0;
  color: #172033;
  font-size: 14px;
}

.ticket-informations span {
  color: #94a3b8;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.ticket-pied {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #f1f5f9;
}

.priorite-point {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.priorite-texte {
  color: #475569;
  font-size: 13px;
  font-weight: 700;
}

.haute {
  background: #ef4444;
}

.moyenne {
  background: #f59e0b;
}

.basse {
  background: #22c55e;
}

@media (max-width: 700px) {
  .page {
    padding: 32px 18px;
  }

  .en-tete {
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
  }

  .statistique {
    align-items: flex-start;
  }

  .filtres,
  .liste-tickets {
    grid-template-columns: 1fr;
  }

  .filtres {
    margin-bottom: 30px;
  }
}
</style>