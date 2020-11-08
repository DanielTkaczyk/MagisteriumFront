<template>
  <div>
    <div v-if="!manipulatorHistoriesData">
      <spinner></spinner>
    </div>
    <div class="page" v-else>
      <h1>Historia zleceń</h1>
      <table id="manipulators">
        <tr>
          <th>Id</th>
          <th>Nazwa zlecenia</th>
          <th>Osoba zlecająca</th>
          <th>StartUser</th>
          <th>Start</th>
          <th>Koniec</th>
          <th>Czas trwania</th>
          <th>Manipulacje</th>
        </tr>
        <tr
          v-for="item in manipulatorHistoriesData.resultObject"
          :key="item.id"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.manipulatorOrder.orderName }}</td>
          <td>{{ item.manipulatorOrder.user.fullName }}</td>
          <td>{{ item.startUser.fullName }}</td>
          <td>
            {{ new Date(item.startTimeStamp).toLocaleString() }}
          </td>
          <td v-if="item.endTimeStamp === null">Aktywne</td>
          <td v-else>
            {{ new Date(item.endTimeStamp).toLocaleString() }}
          </td>
          <td v-if="item.endTimeStamp === null">Brak</td>
          <td v-else>
            {{ getTime(item.startTimeStamp, item.endTimeStamp) }}
          </td>
          <td>
            <b-button
              @click="
                handleModal(item.manipulatorOrder.manipulations)
              "
              v-b-modal.modal-1
              >Pokaż</b-button
            >
          </td>
        </tr>
      </table>

      <b-modal id="modal-1" title="Manipulacje" hide-footer>
        <div>
          <table id="manipulators">
            <tr>
              <th>Pozycja</th>
              <th>Opóźnienie</th>
              <th>Stopnie</th>
            </tr>
            <tr v-for="item in modalData" :key="item.position">
              <td>{{ item.position }}</td>
              <td>{{ item.secondsDelay }}</td>
              <td>{{ item.targetDegree }}</td>
            </tr>
          </table>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Spinner from '../components/Spinner';

export default {
  name: 'History',
  components: {
    Spinner,
  },
  created() {
    this.fetchManipulatorOrdersHistories();
  },
  computed: {
    ...mapGetters({
      manipulatorHistoriesData: 'manipulator/getHistoriesData',
    }),
  },
  data: function() {
    return {
      modalData: [],
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
      fetchManipulatorOrdersHistories:
        'manipulator/fetchManipulatorOrdersHistories',
    }),
    handleModal(index) {
      this.modalData = index;
    },
    getTime(start, end) {
      const date1 = new Date(start);
      const date2 = new Date(end);
      const timespan = date2 - date1;
      function msToHMS(ms) {
        let seconds = ms / 1000;
        seconds = seconds % 3600;
        let minutes = parseInt(seconds / 60);
        seconds = seconds % 60;
        seconds = Math.round(seconds);
        return `${minutes}:${seconds}`;
      }

      return msToHMS(timespan);
    },
  },
};
</script>

<style></style>
