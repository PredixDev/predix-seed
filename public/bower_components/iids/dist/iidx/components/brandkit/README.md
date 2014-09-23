# Brandkit

Brandkit is a convenience library for normalizing GE brand standards across projects that use LESS/CSS and JavaScript.

Brandkit can be installed in a project by including it in the dependencies list of <code>bower.json</code> for a given project.

<pre><code>{
  "name": "project-name",
  "version": "x.x.x",
  "main": [...],
  "dependencies": {
    "brandkit": "dxc/brandkit",
    ...
  }
}
</code></pre>

## LESS

The Brandkit LESS consists of variable definitions for common GE brand treatment, based on Twitter Bootstrap's variables.less file. It includes colors from the GE brand palette, common typography settings and <code>@font-face</code> rules for brand fonts associated with GE voices which are not default system fonts.

To include the Brandkit LESS variables and mixins in a project, <code>@import</code> the <code>components/brandkit/less/brandkit.less</code> file in your project's primary LESS file, adjusting the path based on your Bower configuration if necessary.

If using Bootstrap or variations of Bootstrap (such as the GE Bootstrap component), these components should be imported in your project <em>before</em> Brandkit so that the variables will not be inadvertently overridden.

### Variables

#### Paths

Common paths for use within CSS for locations of images, fonts and other components. Typically overridden at the local level.

- @componentsPath
- @imagesPath
- @fontsPath

#### Monochrome Palette

A greyscale palette for the GE Brand, based on Twitter Bootstrap variable names with extensions.

- @black
- @grayDarkest
- @grayDarker
- @grayDark
- @gray
- @grayLight
- @grayLighter
- @grayLightest
- @offWhite
- @white

#### Accent Palette

Common accent colors used by the GE brand palette.

- @cyan
- @cyanLight
- @cyanDark
- @green
- @greenLight
- @greenDark
- @red
- @redLight
- @redDark
- @orange
- @orangeLight
- @orangeDark
- @purple
- @purpleLight
- @purpleDark
- @blue
- @blueLight
- @blueDark

#### Scaffolding

- @bodyBackground
- @textColor

#### Links

- @linkColor
- @linkColorHover

#### Typography

- @sansFontFamily
- @serifFontFamily
- @monoFontFamily
- @brandFontFamily
- @baseFontSize
- @baseFontFamily
- @baseLineHeight
- @altFontFamily
- @headingsFontFamily
- @headingsFontWeight
- @headingsColor

#### Component sizing

- @fontSizeLarge
- @fontSizeSmall
- @fontSizeMini
- @paddingLarge
- @paddingSmall
- @paddingMini
- @baseBorderRadius
- @borderRadiusLarge
- @borderRadiusSmall

#### Tables

- @tableBackground
- @tableBackgroundAccent
- @tableBackgroundHover
- @tableBorder

#### Buttons

- @btnBackground
- @btnBackgroundHighlight
- @btnBorder
- @btnBorderRadius
- @btnPrimaryBackground
- @btnPrimaryBackgroundHighlight
- @btnInfoBackground
- @btnInfoBackgroundHighlight
- @btnSuccessBackground
- @btnSuccessBackgroundHighlight
- @btnWarningBackground
- @btnWarningBackgroundHighlight
- @btnDangerBackground
- @btnDangerBackgroundHighlight
- @btnInverseBackground
- @btnInverseBackgroundHighlight

#### Forms

- @inputBackground
- @inputBorder
- @inputBorderRadius
- @inputDisabledBackground
- @formActionsBackground
- @inputHeight

#### Dropdowns

- @dropdownBackground
- @dropdownBorder
- @dropdownDividerTop
- @dropdownDividerBottom
- @dropdownLinkColor
- @dropdownLinkColorHover
- @dropdownLinkColorActive
- @dropdownLinkBackgroundHover
- @dropdownLinkBackgroundActive

#### Z-index master list

- @zindexDropdown
- @zindexPopover
- @zindexTooltip
- @zindexFixedNavbar
- @zindexModalBackdrop
- @zindexModal

#### Sprite icons path

- @iconSpritePath
- @iconWhiteSpritePath

#### Input placeholder text color

- @placeholderText

#### Horizontal Rule Color

- @hrBorder

#### Horizontal forms & lists

- @horizontalComponentOffset

#### Wells

- @wellBackground

#### Navbar

- @navbarCollapseWidth
- @navbarCollapseDesktopWidth
- @navbarHeight
- @navbarBackgroundHighlight
- @navbarBackground
- @navbarBorder
- @navbarText
- @navbarLinkColor
- @navbarLinkColorHover
- @navbarLinkColorActive
- @navbarLinkBackgroundHover
- @navbarLinkBackgroundActive
- @navbarSearchBackground
- @navbarSearchBackgroundFocus
- @navbarSearchBorder
- @navbarSearchPlaceholderColor
- @navbarBrandColor

- @navbarInverseBackground
- @navbarInverseBackgroundHighlight
- @navbarInverseBorder
- @navbarInverseText
- @navbarInverseLinkColor
- @navbarInverseLinkColorHover
- @navbarInverseLinkColorActive
- @navbarInverseLinkBackgroundHover
- @navbarInverseLinkBackgroundActive
- @navbarInverseSearchBackground
- @navbarInverseSearchBackgroundFocus
- @navbarInverseSearchBorder
- @navbarInverseSearchPlaceholderColor
- @navbarInverseBrandColor

#### Pagination

- @paginationBackground
- @paginationBorder
- @paginationActiveBackground

#### Hero unit

- @heroUnitBackground
- @heroUnitHeadingColor
- @heroUnitLeadColor

#### Form states and alerts

- @warningText
- @warningBackground
- @warningBorder
- @errorText
- @errorBackground
- @errorBorder
- @successText
- @successBackground
- @successBorder
- @infoText
- @infoBackground
- @infoBorder

#### Tooltips and popovers

- @tooltipColor
- @tooltipBackground
- @tooltipArrowWidth
- @tooltipArrowColor
- @popoverBackground
- @popoverArrowWidth
- @popoverArrowColor
- @popoverTitleBackground
- @popoverArrowOuterWidth
- @popoverArrowOuterColor

#### Grid

- @gridColumns
- @gridColumnWidth
- @gridGutterWidth
- @gridRowWidth

- @gridColumnWidth1200
- @gridGutterWidth1200
- @gridRowWidth1200

- @gridColumnWidth768
- @gridGutterWidth768
- @gridRowWidth768

- @fluidGridColumnWidth
- @fluidGridGutterWidth

- @fluidGridColumnWidth1200
- @fluidGridGutterWidth1200

- @fluidGridColumnWidth768
- @fluidGridGutterWidth768

### Fonts

Voice can be applied to an element by using Brandkit voice mixins which also provide optional parameters for additional font rules (size, weight, leading). The available voices are <code>brand</code>, <code>human</code>, <code>data</code> and <code>ui</code>.

Usage:

<pre><code>.selector {
  #voice > .brand(24px, bold, 28px);
}
</code></pre>

Output:

<pre><code>.selector {
  font-family: "ge-inspira", ...;
  font-size: 24px;
  font-weight: bold;
  line-height: 28px;
}
</code></pre>

Alternatively, the <code>#family</code> subgroup of mixins can be used to only specify <code>font-family</code> for a rule.

Usage:

<pre><code>.selector {
  #voice > #family > .brand();
}
</code></pre>

Output:

<pre><code>.selector {
  font-family: "ge-inspira", ...;
}
</code></pre>

The following fonts are packaged with Brandkit and may also be invoked manually using the designated family names:

- GE Inspira (normal, bold, oblique, bold oblique): <code>"ge-inspira"</code>
- Meta Serif (normal, bold, oblique, bold oblique): <code>"meta-serif"</code>

## JavaScript

The same variables described above in the LESS section are also available in AMD-wrapped JSON format for usage in JavaScript modules.

Usage:

<pre><code>define(['brandkit'], function(brandkit) {
  var blue = brandkit.accentPalette.blue;
});
</code></pre>
