 Context Menu
===============

## Introduction

Context Menu is extended from the following open source project:
[jQuery contextMenu](https://github.com/medialize/jQuery-contextMenu)
Essentially right click to present a menu ala desktop style.

## Basic Usage

Add the "contextmenu" class to your DOM element

    <div class="contextmenu span12 test">Right click in this box</div>

Then add your data elements to the JS of your project

    $.contextMenu({
          // define which elements trigger this menu
          selector: ".contextmenu",
          // define the elements of the menu
          items: {
            "action1": {"name": "Action"},
            "action2": {"name": "Another action"},
            "action3": {"name": "Something else here"},
            "sep1": "---------",
            "fold1": {
                "name": "Separated link",
                "items": {
                    "fold1-key1": {"name": "Action"},
                    "fold1-key3": {"name": "Another Action"}
                }
            }
          }


## Advanced Usage

Refer to the plugin [Documentation](http://medialize.github.io/jQuery-contextMenu/docs.html)

[Demo Gallery](http://medialize.github.io/jQuery-contextMenu/demo.html)
