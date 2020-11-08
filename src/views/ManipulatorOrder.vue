<template>
  <div>
    <div v-if="!latestData">
      <spinner></spinner>
    </div>
    <div v-else>
      <div class="center grey">
        <b-jumbotron
          v-if="wsData.controlState === 0"
          id="max-1600"
          style="height: 320px;"
        >
          <template #header>Tryb automatyczny wyłączony</template>
        </b-jumbotron>
        <b-jumbotron
          v-else
          :style="getBackground(latestData.isActive)"
          id="max-1600"
        >
          <template #header>{{
            latestData.manipulatorOrder.orderName
          }}</template>

          <template #lead>
            {{ latestData.manipulatorOrder.description }}
          </template>
          <div class="buttons">
            <b-button
              :disabled="latestData.isActive"
              style="margin-top:26px;"
              variant="success"
              @click="startOrder"
              class="big-btn"
              >Start</b-button
            >
            <br />
            <b-button
              :disabled="!latestData.isActive"
              variant="danger"
              @click="endOrder"
              class="big-btn"
              >Stop</b-button
            >
            <br />
            <b-button
              :disabled="latestData.isActive"
              v-b-modal.modal-1
              style="margin-top:45px;"
              >Wybierz zlecenie</b-button
            >
            <b-modal id="modal-1" title="Lista zleceń" hide-footer>
              <b-list-group
                v-for="item in manipulatorData.resultObject"
                :key="item.id"
              >
                <b-list-group-item
                  class="listElement"
                  :style="isChecked(item.id)"
                  @click="changeLatestObject(item.id)"
                  >{{ item.orderName }}</b-list-group-item
                >
              </b-list-group>
            </b-modal>
          </div>

          <hr class="my-4" />
          <table>
            <tr>
              <th>Data wystawienia</th>
              <th>Osoba wystawiająca</th>
              <th>Ilość manipulacji</th>
              <th>Zalanowana ilość</th>
              <th>Wykonano</th>
            </tr>
            <tr>
              <td>
                {{ getData(latestData.manipulatorOrder.timeStamp) }}
              </td>
              <td>{{ latestData.manipulatorOrder.user.fullName }}</td>
              <td>
                {{ latestData.manipulatorOrder.manipulationsCount }}
              </td>
              <td>{{ latestData.manipulatorOrder.targetAmount }}</td>
              <td>
                {{ latestData.manipulatorOrder.completedAmounts }}
              </td>
            </tr>
          </table>
        </b-jumbotron>
      </div>
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <div class="angle-left">
              <div class="angle-text">Kąt uda</div>

              <div class="angle-degree">
                {{ wsData.upperPartDegree }}&#186;
              </div>
            </div>
            <div class="chart1-data angle-container">
              <div class="angle-text">Kąt zgięcia</div>
              <div class="angle-degree">
                {{ wsData.deflectionDegree }}&#186;
              </div>
            </div>
            <div class="angle-right">
              <div class="angle-text">Kąt łydki</div>

              <div class="angle-degree">
                {{ wsData.lowerPartDegree }}&#186;
              </div>
            </div>
            <svg
              id="clock"
              version="1.1"
              preserveAspectRatio="xMidYMid meet"
              viewBox="-50 -50 100 100"
            >
              <defs>
                <g id="clockface">
                  <circle cx="0" cy="0" r="49" />

                  <g id="mark-minute">
                    <line x1="0" y1="-44" x2="0" y2="-47" />
                  </g>

                  <g id="mark-text">
                    <text x="-1" y="-45" class="mark-text">5</text>
                  </g>
                  <g id="marks5">
                    <use
                      xlink:href="#mark-text"
                      transform="rotate(0)"
                    />
                    <use
                      xlink:href="#mark-minute"
                      transform="rotate(5)"
                    />
                    <use
                      xlink:href="#mark-minute"
                      transform="rotate(10)"
                    />
                    <use
                      xlink:href="#mark-minute"
                      transform="rotate(15)"
                    />
                    <use
                      xlink:href="#mark-minute"
                      transform="rotate(20)"
                    />
                    <use
                      xlink:href="#mark-minute"
                      transform="rotate(25)"
                    />
                    <use
                      xlink:href="#mark-minute"
                      transform="rotate(30)"
                    />
                    <use
                      xlink:href="#mark-minute"
                      transform="rotate(35)"
                    />
                    <use
                      xlink:href="#mark-minute"
                      transform="rotate(40)"
                    />
                  </g>

                  <use xlink:href="#marks5" transform="rotate(45)" />
                  <use xlink:href="#marks5" transform="rotate(90)" />
                  <use xlink:href="#marks5" transform="rotate(135)" />
                  <use xlink:href="#marks5" transform="rotate(180)" />
                  <use xlink:href="#marks5" transform="rotate(225)" />
                  <use xlink:href="#marks5" transform="rotate(270)" />
                  <use xlink:href="#marks5" transform="rotate(315)" />
                  <use xlink:href="#marks5" transform="rotate(360)" />
                </g>

                <g id="hand">
                  <line x1="0" y1="0" x2="0" y2="-40" />
                </g>
              </defs>

              <use xlink:href="#clockface" />

              <g id="offset-hours" :style="getHours()">
                <use id="hour-hand" xlink:href="#hand" />
              </g>
              <g id="offset-minutes" :style="getMinutes()">
                <use id="minute-hand" xlink:href="#hand" />
              </g>
            </svg>
          </b-col>
          <div style="margin:45px"></div>
          <b-col>
            <div class="chart1-data angle-container">
              <div class="angle-text">Przechylenie</div>
              <div class="angle-degree">
                {{ wsData.horizontalDegree }}&#186;
              </div>
            </div>
            <svg
              id="clock"
              version="1.1"
              preserveAspectRatio="xMidYMid meet"
              viewBox="-50 -50 100 100"
            >
              <defs>
                <g id="clockface">
                  <circle cx="0" cy="0" r="49" />

                  <g id="mark-minute">
                    <line x1="0" y1="-44" x2="0" y2="-47" />
                  </g>

                  <g id="mark-text">
                    <text x="-1" y="-45" class="mark-text">5</text>
                  </g>
                  <g id="marks5">
                    <use
                      xlink:href="#mark-text"
                      transform="rotate(0)"
                    />
                    <use
                      xlink:href="#mark-minute"
                      transform="rotate(5)"
                    />
                    <use
                      xlink:href="#mark-minute"
                      transform="rotate(10)"
                    />
                    <use
                      xlink:href="#mark-minute"
                      transform="rotate(15)"
                    />
                    <use
                      xlink:href="#mark-minute"
                      transform="rotate(20)"
                    />
                    <use
                      xlink:href="#mark-minute"
                      transform="rotate(25)"
                    />
                    <use
                      xlink:href="#mark-minute"
                      transform="rotate(30)"
                    />
                    <use
                      xlink:href="#mark-minute"
                      transform="rotate(35)"
                    />
                    <use
                      xlink:href="#mark-minute"
                      transform="rotate(40)"
                    />
                  </g>

                  <use xlink:href="#marks5" transform="rotate(45)" />
                  <use xlink:href="#marks5" transform="rotate(90)" />
                  <use xlink:href="#marks5" transform="rotate(135)" />
                  <use xlink:href="#marks5" transform="rotate(180)" />
                  <use xlink:href="#marks5" transform="rotate(225)" />
                  <use xlink:href="#marks5" transform="rotate(270)" />
                  <use xlink:href="#marks5" transform="rotate(315)" />
                  <use xlink:href="#marks5" transform="rotate(360)" />
                </g>

                <g id="hand">
                  <line x1="0" y1="0" x2="0" y2="-40" />
                </g>
              </defs>

              <use xlink:href="#clockface" />

              <g id="offset-hours" :style="getHours2()">
                <use id="hour-hand2" xlink:href="#hand" />
              </g>
              <g id="offset-minutes" :style="getMinutes2()">
                <use id="hour-hand2" xlink:href="#hand" />
              </g>
            </svg>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import Spinner from '../components/Spinner';
import { WSURL } from '../axios';
export default {
  name: 'ManipulatorOrder',
  components: {
    Spinner,
  },
  created() {
    this.fetchManipulatorOrders();
    this.fetchLatestManipulatorOrder();
    let connection = new HubConnectionBuilder()
      .withUrl(WSURL)
      .configureLogging(LogLevel.Information)
      .build();

    connection.on('HubMethod', data => {
      this.wsData = data;
    });
    connection.start();
  },
  computed: {
    ...mapGetters({
      latestData: 'manipulator/getLatestData',
      startStatus: 'manipulator/getStartManipulatorStatus',
      endStatus: 'manipulator/getEndManipulatorStatus',
      manipulatorData: 'manipulator/getData',
    }),
  },
  data: function() {
    return {
      connection: null,
      wsData: [],
      selected: null,
      options: null,
      madalData: null,
    };
  },
  methods: {
    ...mapActions({
      fetchLatestManipulatorOrder:
        'manipulator/fetchLatestManipulatorOrder',
      startManipulatorOrder: 'manipulator/startManipulatorOrder',
      endManipulatorOrder: 'manipulator/endManipulatorOrder',
      fetchManipulatorOrders: 'manipulator/fetchManipulatorOrders',
    }),
    isChecked(id) {
      if (id === this.latestData.manipulatorOrder.id) {
        return 'background-color: #e9ecef;';
      }
      return '';
    },
    getData(data) {
      return moment(data).format('DD.MM.YYYY, HH:mm');
    },
    getBackground(bool) {
      if (bool) {
        return 'background-color: rgba(155, 248, 121, 0.196);';
      } else {
        return '';
      }
    },
    getMinutes() {
      return `transform: rotate(${this.wsData.lowerPartDegree +
        90}deg)`;
    },
    getHours() {
      return `transform: rotate(${this.wsData.upperPartDegree +
        270}deg)`;
    },
    getMinutes2() {
      return `transform: rotate(${this.wsData.horizontalDegree +
        90}deg)`;
    },
    getHours2() {
      return `transform: rotate(${this.wsData.horizontalDegree +
        270}deg)`;
    },
    startOrder() {
      this.startManipulatorOrder(this.latestData.manipulatorOrder.id);
    },
    endOrder() {
      this.endManipulatorOrder(this.latestData.id);
    },
    changeLatestObject(id) {
      let resObject = this.manipulatorData.resultObject.find(obj => {
        return obj.id === id;
      });
      resObject = {
        manipulatorOrder: resObject,
      };
      this.$store.commit('manipulator/FETCH_LATEST_ORDER_SUCCESS', {
        data: resObject,
      });
    },
  },
};
</script>

<style scoped>
td,
th {
  padding: 5px;
}

html,
body {
  margin: 0;
  height: 100%;
}

#clockface {
  fill: #e9ecef;
}
#marks5 use {
  stroke: #444;
  stroke-width: 0.1;
}

#marks5 use:first-child {
  stroke: #fff;
}

#date-display rect {
  stroke: #444;
  stroke-width: 1;
}

#hand line,
#mark-minute {
  stroke-linecap: round;
}

#hand {
  fill: #fff;
}
#hour-hand {
  stroke-width: 2;
  stroke: rgb(226, 133, 33);
}
#hour-hand2 {
  stroke-width: 1;
  stroke: brown;
}
#minute-hand {
  stroke-width: 2;
  stroke: rgb(80, 55, 150);
  color: red;
}

.mark-text {
  font: normal 300 3px arial;
}

.chart1-data {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.angle-degree {
  font-size: 40px;
}
.angle-text {
  font-size: 26px;
}

.angle-container {
  text-align: center;
}
.angle-right {
  text-align: center;
  position: absolute;
  top: 10%;
  right: -10%;
  transform: translate(-50%, -50%);
}
.angle-left {
  text-align: center;
  position: absolute;
  top: 10%;
  left: 10%;
  transform: translate(-50%, -50%);
}

#max-1600 {
  max-width: 1600px;
  margin: 0 auto;
  margin-bottom: 35px;
  padding-bottom: 16px;
}

.bv-example-row {
  margin-bottom: 30px;
}

.grey {
  background-color: #e9ecef;
}

.listElement {
  cursor: pointer;
}
.listElement:hover {
  background-color: rgba(223, 223, 223, 0.439);
}

.buttons {
  position: absolute;
  top: 0;
  right: 0;
}
.buttons button {
  margin: 5px 26px;
  width: 220px;
  border-radius: 5px;
  text-transform: uppercase;
}
.big-btn {
  height: 80px;
}
</style>
