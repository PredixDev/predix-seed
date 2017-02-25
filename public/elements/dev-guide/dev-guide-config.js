window.predix = window.predix || {};
window.predix.devGuideURL = '';
window.predix.hopscotch = hopscotch;
window.predix.isTouring = false;
window.predix.featureTourEventName = 'FEATURE_TOUR';
window.predix.pathGuideConfig = {
  id : "path-guide",
  completedStepIcon : "fa-check",
  currentStepIcon : "fa-circle",
  stepClickEventName : window.predix.featureTourEventName,
  styles: {
    position : 'absolute',
    left : "700px",
    top : '13px',
    vars: {
      /* icon styles */
      'px-path-guide-icon-size': '14px',
      'px-path-guide-icon-color': '#3ab4d4',
      'px-path-guide-icon-top': '-8px',
      'px-path-guide-icon-left': '-8px',
      'px-path-guide-current-icon-size': '20px',
      'px-path-guide-current-icon-color': '#3ab4d4',
      'px-path-guide-current-icon-top': '-10px',
      'px-path-guide-current-icon-left': '-9px',

      /* connector styles */
      'px-path-guide-connector-color': '#3ab4d4',
      'px-path-guide-connector-length': '150px',

      /* node/step styles */
      'px-path-guide-step-diameter': '20px',
      'px-path-guide-step-radius': '12px',
      'px-path-guide-step-border-color': '#3ab4d4',
      'px-path-guide-step-fill-color': '#2c404c',
      'px-path-guide-current-step-diameter': '30px',
      'px-path-guide-current-step-radius': '15px',
      'px-path-guide-current-step-border-color': '#fff',
      'px-path-guide-current-step-fill-color': '#2c404c',

      /* label styles */
      'px-path-guide-step-label-color': '#999',
      'px-path-guide-step-label-font-weight': 'normal',
      'px-path-guide-current-step-label-color': '#fff',
      'px-path-guide-current-step-label-font-weight': 'bold',
      'px-path-guide-step-label-width': '80px',
      'px-path-guide-step-label-top': '18px',
      'px-path-guide-step-label-font-size': '11px'
    }
  }
};
