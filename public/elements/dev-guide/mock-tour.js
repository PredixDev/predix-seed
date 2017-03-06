window.predix = window.predix || {};
window.predix.hopscotchTour = {
  'tour0' : {
    id: "basic-application",
    i18n: {
      stepNums: ['1', '1.1', '1.2', '1.3', '1.4', '1.5']
    },
    steps: [
    {
      title: "Basic Application",
      content: "Congratulations!  You have successfully installed a basic form of the Predix UI Seed, with essential features like header, navigation, content area and footer. The corresponding documentaion for this step is <a style=\"font-weight: bold; text-decoration: none;\" target=\"_new\" href=\"https://www.predix.io/resources/tutorials/tutorial-details.html?tutorial_id=2101&tag=2100&journey=Predix%20UI%20Seed&resources=2101,2225\">here</a>",
      target: "step-item-0",
      xOffset: -30,
      yOffset: 30,
      placement: "bottom",
    },
    {
      title: "Seed Header",
      content: "Page header for the Predix UI Seed",
      target: "seed-header",
      placement: "bottom"
    },
    {
      title: "App Navigation",
      content: "Navigation using the 'px-app-nav' Predix UI Component",
      target: "app-nav",
      placement: "right",
    },
    {
      title: "Content Area",
      content: "Main content area",
      target: "content-area",
      xOffset: "center",
      yOffset: "center",
      placement: "top",
    },
    {
      title: "Sample View",
      content: "A Predix UI component for generic view encapsulation",
      target: "sample-view",
      xOffset: "center",
      placement: "bottom",
    },
    {
      title: "Footer",
      content: "Application footer",
      target: "seed-footer",
      placement: "top",
    }
    ]
  },
  'tour1' : {
    id: 'uaa-integration',
    i18n: {
      stepNums: ['2', '2.1', '2.2']
    },
    steps: [
    {
      title: "UAA Integration",
      content: "Congratulations!  You have successfully integrated your application frontend with UAA service.  This will allow you to secure all or specific portions of your application.  You can follow this <a target=\"_blank\" style=\"text-decoration: none; font-weight: bold;\" href=\"https://www.predix.io/resources/tutorials/tutorial-details.html?tutorial_id=2105&tag=2108&journey=UAA%20Dashboard\">link</a> to review the relevant guide for this step.",
      target: "step-item-1",
      xOffset: -30,
      yOffset: 30,
      placement: "bottom",
    },
    {
      title: "Context Browser",
      content: "A Predix UI component geared for asset tree representation",
      target: "contextBrowser",
      xOffset: "center",
      placement: "bottom",
    },
    {
      title: "Sample Visualizations",
      content: "Example Predix UI visualization components",
      target: "widgetsx3",
      xOffset: 500,
      placement: "top",
    }
    ]
  },
  'tour2' : {
    id: 'asset-data-integration',
    i18n: {
      stepNums: ['3']
    },
    steps: [
    {
      title: "Asset Data Integration",
      content: "You are currently at a stage of the Predix UI Seed where you will be adding features for data integration, specifically with an instance of the Asset Data Service.",
      target: "step-item-2",
      xOffset: -30,
      yOffset: 30,
      placement: "bottom",
    }
  ]
  },
  'tour3' : {
    id: 'analytics-features',
    i18n: {
      stepNums: ['4']
    },
    steps: [
    {
      title: "Analytics",
      content: "Your next step will be the installation of analytics features.  Upon completion of your current step, these features will be enabled.",
      target: "step-item-3",
      xOffset: -30,
      yOffset: 30,
      placement: "bottom",
    }
  ]
  }
}
