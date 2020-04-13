import {
  CONDUCT_TEST_ERROR,
  CONDUCT_TEST,
  GET_ALL_TEST_RESULTS,
  GET_ALL_TEST_RESULTS_ERROR,
  GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_HEALTHY,
  GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_HEALTHY_ERROR,
  GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_HIGH_RISK,
  GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_HIGH_RISK_ERROR,
  GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_NONE,
  GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_NONE_ERROR,
  GET_TEST_RESULTS_MATCH_BY_NEGATIVE_ORDER_BY_DATE,
  GET_TEST_RESULTS_MATCH_BY_NEGATIVE_ORDER_BY_DATE_ERROR,
  GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_NONE,
  GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_HIGH_RISK_ERROR,
  GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_NONE_ERROR,
  GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_HIGH_RISK,
  GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_NOT_HIGH_RISK,
  GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_NOT_HIGH_RISK_ERROR,
  GET_TEST_RESULTS_MATCH_BY_POSITIVE_ORDER_BY_DATE,
  GET_TEST_RESULTS_MATCH_BY_POSITIVE_ORDER_BY_DATE_ERROR,
} from "../actions/types/actionTypes";

const initialState = {
  test: null,
  loading: true,
  AllTestResults: [],
  TestResultsOrderedByDate: [],
  TestResultsMatchByPositiveGroupByHighRisk: [],
  TestResultsMatchByPositiveGroupByNotHighRisk: [],
  TestResultsMatchByPositiveGroupByNone: [],
  TestresultsMatchByPositiveOrderByDate: [],
  TestResultsMatchByNegativeGroupByHealthy: [],
  TestResultsMatchByNegativeGroupByHighRisk: [],
  TestResultsMatchByNegativeGroupByNone: [],
  TestResultsMatchByNegativeOrderByDate: [],
};

export default function (state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case CONDUCT_TEST:
      return {
        ...state,
        loading: false,
        test: payload,
      };
    case CONDUCT_TEST_ERROR:
      return {
        ...state,
        loading: false,
      };
    case GET_ALL_TEST_RESULTS:
      return {
        ...state,
        AllTestResults: payload,
        loading: false,
      };
    case GET_ALL_TEST_RESULTS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_HEALTHY:
      return {
        ...state,
        TestResultsMatchByNegativeGroupByHealthy: payload,
        loading: false,
      };
    case GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_HEALTHY_ERROR:
      return {
        ...state,
        loading: false,
      };
    case GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_HIGH_RISK:
      return {
        ...state,
        TestResultsMatchByNegativeGroupByHighRisk: payload,
        loading: false,
      };
    case GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_HIGH_RISK_ERROR:
      return {
        ...state,
        loading: false,
      };
    case GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_NONE:
      return {
        ...state,
        loading: false,
        TestResultsMatchByNegativeGroupByNone: payload,
      };
    case GET_TEST_RESULTS_MATCH_BY_NEGATIVE_GROUP_BY_NONE_ERROR:
      return {
        ...state,
        loading: false,
      };
    case GET_TEST_RESULTS_MATCH_BY_NEGATIVE_ORDER_BY_DATE:
      return {
        ...state,
        TestResultsMatchByNegativeOrderByDate: payload,
        loading: false,
      };
    case GET_TEST_RESULTS_MATCH_BY_NEGATIVE_ORDER_BY_DATE_ERROR:
      return {
        ...state,
        loading: false,
      };
    case GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_NONE:
      return {
        ...state,
        loading: false,
        TestResultsMatchByPositiveGroupByNone: payload,
      };
    case GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_NONE_ERROR:
      return {
        ...state,
        loading: false,
      };
    case GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_HIGH_RISK:
      return {
        ...state,
        TestResultsMatchByPositiveGroupByHighRisk: payload,
        loading: false,
      };
    case GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_HIGH_RISK_ERROR:
      return {
        ...state,
        loading: false,
      };
    case GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_NOT_HIGH_RISK:
      return {
        ...state,
        loading: false,
        TestResultsMatchByPositiveGroupByNotHighRisk: payload,
      };
    case GET_TEST_RESULTS_MATCH_BY_POSITIVE_GROUP_BY_NOT_HIGH_RISK_ERROR:
      return {
        ...state,
        loading: false,
      };
    case GET_TEST_RESULTS_MATCH_BY_POSITIVE_ORDER_BY_DATE:
      return {
        ...state,
        TestresultsMatchByPositiveOrderByDate: payload,
        loading: false,
      };
    case GET_TEST_RESULTS_MATCH_BY_POSITIVE_ORDER_BY_DATE_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
