import { ACTIONS } from 'redux/actions/types.js';
import { mainAction } from "redux/actions/index.actions";
import { db } from "../../firebase"; // Import Firestore instance
import { collection, getDocs, addDoc, query, where, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore"; // Import Firestore functions
import _ from 'lodash';

const initialState = {};
let d = new Date();
let month = d.getMonth() + 1;
let year = d.getFullYear();

export default function agendaReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.CREATE_NEW_AGENDA: {
      console.log(action);
      let stateCopy = _.cloneDeep(action.payload);

      // Add a new document to the "agendas" collection
      addDoc(collection(db, "agendas"), stateCopy)
        .then((docRef) => {
          console.log(docRef);
          stateCopy._id = docRef.id;
          action.asyncDispatch(mainAction(ACTIONS.CREATE_NEW_AGENDA_SUCCESS, stateCopy));
        });

      return state;
    }

    case ACTIONS.CREATE_NEW_AGENDA_SUCCESS: {
      window.location.reload(true);
      return action.payload;
    }

    case ACTIONS.DELETE_AGENDA: {
      // Query the "agendas" collection to find the document to delete
      const q = query(collection(db, "agendas"), where("id", "==", action.payload));
      getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => deleteDoc(doc.ref));
          action.asyncDispatch(mainAction(ACTIONS.DELETE_AGENDA_SUCCESS, []));
        });

      return state;
    }

    case ACTIONS.DELETE_AGENDA_SUCCESS: {
      action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDAS, []));
      return state;
    }

    case ACTIONS.LOAD_CD_AGENDA: {
      // Query the "agendas" collection with filters and ordering
      const q = query(
        collection(db, "agendas"),
        where("year", ">=", year.toString()),
        orderBy("year", "asc"),
        orderBy("month", "asc")
      );

      getDocs(q)
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data());
          action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_AGENDA_SUCCESS, data));
        });

      return state;
    }

    case ACTIONS.LOAD_DASHBOARD_CD_AGENDA: {
      // Query the "agendas" collection with filters and ordering
      const q = query(
        collection(db, "agendas"),
        where("year", ">=", year.toString()),
        orderBy("year", "asc"),
        orderBy("month", "asc"),
        orderBy("day", "asc")
      );

      getDocs(q)
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data());
          action.asyncDispatch(mainAction(ACTIONS.LOAD_DASHBOARD_CD_AGENDA_SUCCESS, data));
        });

      return state;
    }

    case ACTIONS.LOAD_CD_AGENDA_SUCCESS: {
      return _.orderBy(action.payload, ['year', 'month', 'day'], ['asc', 'asc', 'asc']);
    }

    case ACTIONS.LOAD_DASHBOARD_CD_AGENDA_SUCCESS: {
      let successData = _.orderBy(action.payload, ['month', 'day', 'year'], ['asc', 'asc', 'asc']);
      let dataArray = [];
      let extendedArray = [];

      successData.map((newData) => {
        newData.month < 9 && +newData.year === +year ? dataArray.push(newData) : extendedArray.push(newData);
      });

      dataArray.push(...extendedArray);
      return dataArray;
    }

    case ACTIONS.LOAD_CD_AGENDA_FAIL: {
      return state;
    }

    case ACTIONS.LOAD_AGENDAS: {
      console.log(action);

      // Query the "agendas" collection with filters and ordering
      const q = query(
        collection(db, "agendas"),
        where("year", ">=", year.toString()),
        orderBy("year", "asc"),
        orderBy("month", "asc")
      );

      getDocs(q)
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data());
          let agendas = [];

          Object.values(data).map((agenda) => {
            agenda.date = `${agenda.month}-${agenda.day}-${agenda.year}`;
            agenda.month = +agenda.month;

            if (+agenda.month >= +month || +agenda.year > +year) {
              agendas.push(agenda);
            }
          });

          action.asyncDispatch(mainAction(ACTIONS.LOAD_CD_AGENDA_SUCCESS, agendas));
        });

      return state;
    }

    case ACTIONS.LOAD_AGENDAS_SUCCESS: {
      return action.payload;
    }

    case ACTIONS.LOAD_AGENDAS_FAIL: {
      return state;
    }

    case ACTIONS.LOAD_AGENDAS_FILTERED: {
      // Query the "agendas" collection with filters and ordering
      const q = query(
        collection(db, "agendas"),
        where("year", "==", action.payload.year.toString()),
        orderBy("month", "asc")
      );

      getDocs(q)
        .then((snapshot) => {
          let agendas = [];
          const data = snapshot.docs.map((doc) => doc.data());

          Object.values(data).map((agenda) => {
            agenda.date = `${agenda.month}-${agenda.day}-${agenda.year}`;
            agenda.month = +agenda.month;
            return agendas.push(agenda);
          });

          action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDAS_SUCCESS, _.orderBy(agendas, ['month', 'day'], ['asc', 'asc'])));
        });

      return state;
    }

    case ACTIONS.LOAD_AGENDA: {
      // Query the "agendas" collection to find a specific document
      const q = query(collection(db, "agendas"), where("id", "==", action.payload));

      getDocs(q)
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data());

          if (data.length > 0) {
            action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDA_SUCCESS, { ...data }));
          }
        });

      return state;
    }

    case ACTIONS.LOAD_AGENDA_SUCCESS: {
      return action.payload ? action.payload[0] : state;
    }

    case ACTIONS.LOAD_AGENDA_FAIL: {
      return state;
    }

    case ACTIONS.UPDATE_AGENDA: {
      let _id = '';

      // Query the "agendas" collection to find the document to update
      const q = query(collection(db, "agendas"), where("id", "==", action.payload.id));

      getDocs(q)
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            _id = doc.id;
          });

          // Update the document
          updateDoc(doc(db, "agendas", _id), action.payload)
            .then(() => {
              console.log("success");
              action.asyncDispatch(mainAction(ACTIONS.UPDATE_AGENDA_SUCCESS, action.payload));
            });
        });

      return state;
    }

    case ACTIONS.UPDATE_AGENDA_SUCCESS: {
      let stateCopy = _.cloneDeep(action.payload);
      action.asyncDispatch(mainAction(ACTIONS.LOAD_AGENDA, stateCopy.id));
      return stateCopy;
    }

    case ACTIONS.UPDATE_AGENDA_FAIL: {
      return state;
    }

    default:
      return {
        ...state,
      };
  }
}