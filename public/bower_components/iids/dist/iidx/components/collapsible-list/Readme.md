Collapsible-List
===============

## Introduction

Collapsible List is a tree component for layering small sets of items.

Limited by design to 3 levels of navigation

## Basic Usage

Add the "collapsible-list" class to your ul element

    <ul class="collapsible-list">

## Class Options

collapsible-list-parent : add to your anchor tags that have children

nav-header : unselectable li item

secondary : add to ul to create 2nd level items

tertiary : add to ul to create 3rd level items

collapsible-list-subnav : add to li to create collapsible item

## Example

    <ul class="collapsible-list">
      <li class="nav-header">List Header</li>
      <li class="collapsible-list-subnav">
        <a href="#">Primary Nav 1</a>

        <ul class="collapsible-list secondary">
          <li class="collapsible-list-subnav">
            <a href="#">Secondary Nav 1</a>

            <ul class="collapsible-list tertiary">
              <li>
                 <a href="#">Tertiary Nav 1</a>
              </li>
            </ul>

          </li>
        </ul>

      </li>
      <li class="collapsible-list-subnav">
        <a href="#">Primary Nav 2</a>

        <ul class="collapsible-list secondary">
          <li>
            <a href="#">Secondary Nav 2</a>
          </li>
        </ul>

      </li>
      <li><a href="#">Primary Nav 3</a></li>
      <li class="nav-header">Another List Header</li>
      <li><a href="#">Primary Nav 4</a></li>
      <li><a href="#">Primary Nav 5</a></li>
    </ul>
