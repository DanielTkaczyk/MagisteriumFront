<template>
  <div>
    <div>
      <b-button class="button-modal" id="show-btn" @click="showModal"
        >Dodaj zlecenie</b-button
      >
      <b-modal
        ref="my-modal"
        hide-footer
        title="Panel dodawania zleceń"
      >
        <div class="d-block text-center">
          <b-form @submit="handleAddManipulatorOrder($event)">
            <label class="label" for="input-1">Nazwa zlecenia</label>
            <b-form-input
              id="input-1"
              v-model="OrderName"
              required
              placeholder="Wpisz nazwę zlecenia..."
            ></b-form-input>
            <label class="label" for="input-2"
              >Liczba powtórzeń</label
            >
            <b-form-input
              id="input-2"
              v-model="TargetAmount"
              required
              type="number"
              placeholder="Wpisz planowaną liczbę ćwiczeń..."
            ></b-form-input>
            <label class="label" for="textarea">Opis zlecenia</label>
            <b-form-textarea
              id="textarea"
              v-model="Description"
              placeholder="Opisz zlecenie..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
            <label class="label">Manipulacje (kąt, opóźnienie)</label>
            <div class="add-panel">
              <b-input
                type="number"
                v-model="Deley"
                placeholder="Opóźnienie"
              ></b-input>
              <b-input
                type="number"
                v-model="Degree"
                placeholder="Kąt"
              ></b-input>
              <b-button @click="handleAddManipulation"
                ><i class="fas fa-plus"></i
              ></b-button>
            </div>
            <b-list-group>
              <b-list-group-item
                v-for="item in Manipulations"
                :key="item.position + Date.now()"
                class="itemList"
              >
                Opóźnienie: {{ item.secondsDelay }} --- Kąt:
                {{ item.targetDegree }}
                <i
                  @click="deleteManipulation(item.position)"
                  class="far fa-times-circle"
                ></i>
              </b-list-group-item>
            </b-list-group>
            <b-button
              class="add-submit-button"
              type="submit"
              variant="success"
              >Dodaj!</b-button
            >
          </b-form>
        </div>
      </b-modal>
    </div>
    <div v-if="!manipulatorData">
      <spinner></spinner>
    </div>
    <div class="page" v-else>
      <h1>Zlecenia</h1>
      <table id="manipulators">
        <tr>
          <th>Id</th>
          <th>Nazwa zlecenia</th>
          <th>Opis</th>
          <th>Data utworzenia</th>
          <th>Osoba zlecająca</th>
          <th>Zaplanowana liczba wykonań</th>
          <th>Wykonano</th>
          <th>Usuń</th>
        </tr>
        <tr
          v-for="item in manipulatorData.resultObject"
          :key="item.id"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.orderName }}</td>
          <td>{{ item.description }}</td>
          <td>{{ new Date(item.timeStamp).toLocaleString() }}</td>
          <td>{{ item.user.fullName }}</td>
          <td>{{ item.targetAmount }}</td>
          <td>{{ item.completedAmounts }}</td>
          <td class="td-icon">
            <button
              @click="handleDeleteManipulatorOrder($event, item.id)"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Spinner from '../components/Spinner';

export default {
  name: 'ManipulatorOrders',
  components: {
    Spinner,
  },
  created() {
    this.fetchManipulatorOrders();
  },
  computed: {
    ...mapGetters({
      manipulatorData: 'manipulator/getData',
    }),
  },
  data: function() {
    return {
      OrderName: '',
      Description: '',
      Manipulations: [],
      Deley: 0,
      Degree: 0,
      counter: 0,
      TargetAmount: 0,
    };
  },
  methods: {
    ...mapActions({
      addManipulatorOrder: 'manipulator/addManipulatorOrder',
      deleteManipulatorOrder: 'manipulator/deleteManipulatorOrder',
      fetchManipulatorOrders: 'manipulator/fetchManipulatorOrders',
    }),
    handleAddManipulatorOrder(e) {
      e.preventDefault();
      this.addManipulatorOrder({
        OrderName: this.OrderName,
        Description: this.Description,
        Manipulations: this.Manipulations,
        TargetAmount: this.TargetAmount,
      });
      this.hideModal();
    },
    handleDeleteManipulatorOrder(e, id) {
      e.preventDefault();
      this.deleteManipulatorOrder(id);
    },
    showModal() {
      this.$refs['my-modal'].show();
    },
    hideModal() {
      this.$refs['my-modal'].hide();
    },
    handleAddManipulation() {
      const object = {
        position: this.counter,
        secondsDelay: parseInt(this.Deley),
        targetDegree: parseInt(this.Degree),
      };
      this.Manipulations.push(object);
      this.Manipulations.map((item, index) => {
        return (item.position = index);
      });
      this.counter += 1;
    },
    deleteManipulation(id) {
      this.Manipulations.splice(id, 1);
      this.Manipulations.map((item, index) => {
        return (item.position = index);
      });
    },
  },
};
</script>

<style>
h1 {
  text-align: center;
}
.button-modal {
  position: absolute;
  right: 0;
  top: 0;
  margin: 26px;
  width: 220px;
  border-radius: 25px;
  text-transform: uppercase;
}
.page {
  margin: 25px;
  margin-top: 80px;
}
.td-icon button {
  background: transparent;
  border: none;
}
.td-icon i {
  font-size: 20px;
}

#manipulators {
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
}

#manipulators td,
#manipulators th {
  text-align: center;
  border: 1px solid #ddd;
  padding: 8px;
}

#manipulators tr:nth-child(even) {
  background-color: #f2f2f2;
}

#manipulators tr:hover {
  background-color: #ddd;
}

#manipulators th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: rgb(0, 97, 142);
  color: white;
}
.add-panel {
  display: flex;
}

.add-panel input,
.add-panel button {
  margin: 10px 0;
}
.add-panel input {
  margin-right: 5px;
}

.add-submit-button {
  width: 100%;
}

.label {
  margin: 12px 1px 2px 1px;
  text-align: left;
  width: 100%;
}
.fa-times-circle {
  cursor: pointer;
  color: rgb(165, 16, 16);
}
.itemList:hover {
  background-color: rgba(245, 245, 245, 0.83);
}
</style>
