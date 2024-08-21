<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <!-- Paramètre pour le code du pays -->
  <xsl:param name="code"/>

  <!-- Template correspondant aux pays ayant le code spécifié -->
  <xsl:template match="/countries/country[code=$code]">
    <xsl:copy-of select="official"/>
    <xsl:copy-of select="capital"/>
  </xsl:template>

  <!-- Template par défaut pour les autres éléments -->
  <xsl:template match="node() | @*">
    <xsl:copy>
      <xsl:apply-templates select="node() | @*"/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>
