<?xml version = "1.0" encoding = "UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" /> 

<xsl:template match="/"> 
<html> 
 <head> 
 	<title> 
 		B3124 Dalaoui Jourda
 	</title> 
 </head> 
 
 <body style="background-color:white;"> 
    <table cellspacing="50" align="center">
    <tr>
        <td>
        <xsl:apply-templates select="//cover"/>
        </td>
        <td>
         	<h1 style="text-align:center; color:blue;">LePetitPrince</h1> 
            <xsl:apply-templates select="//author"/>
            <xsl:apply-templates select="//styling_information"/>
        </td>
        </tr>
        </table>
    <hr/>

<h3>Début du texte:</h3>
<xsl:apply-templates select="//paragraph"/>

  <h3>Fin du texte.</h3>
  <hr/>

</body> 
</html> 
</xsl:template> 

<xsl:template match="author">

<h2 style="text-align:center; font-style: italic;">
<xsl:value-of select="."/>
</h2>

</xsl:template> 

<xsl:template match="styling_information">

<blockquote style = "color:darkgreen;"> 
But du TP du <xsl:value-of select="//date"/>: <xsl:value-of select="//styling_description"/>
<br/>
Auteurs: <xsl:value-of select="//style_manager[1]"/> and <xsl:value-of select="//style_manager[2]"/> (<xsl:value-of select="//NoBinome"/>)
<br/>
Email du responsable: <xsl:value-of select="//email"/>
<br/>
</blockquote> 

</xsl:template> 


<xsl:template match="cover">
<div align="center">
<img>
<xsl:attribute name="src">
<xsl:value-of select="@path"/>
</xsl:attribute>
</img>
</div>
</xsl:template>

<xsl:template match="paragraph">

  <xsl:if test="preceding-sibling::*[1]/self::image">
    <xsl:apply-templates select="//image"/>
  </xsl:if>


<xsl:if test="@type = 'dialogue'">
<table align="center" width="90%">

    <tr>
    <td width="45%">
    <table border="1" cellpadding="10" width="100%">

    <xsl:for-each select="phrase[@language='francais']">
    <tr>
      <td width="50">
        <img src="../images/{@speaker}.png" title="{@speaker}"/>
      </td>
      <td>
        <xsl:choose>
          <xsl:when test="contains(.,'mouton')">
            <span style=" font-size: 24px; font-weight: bold;">
            <xsl:apply-templates select="."/>
            <img src="../images/moutonDessin.png" title="Mouton"/>
            </span>
          </xsl:when>
          <xsl:otherwise>
            <xsl:apply-templates select="."/>
          </xsl:otherwise>
        </xsl:choose>
      </td>
    </tr>
    </xsl:for-each>
</table>
</td>
<td></td>

    <td width="45%">
    <table border="1" cellpadding="10" width="100%">
    

    <xsl:for-each select="phrase[@language='hongrois']">
    <tr>
      <td width="50">
        <img src="../images/{@speaker}.png" title="{@speaker}"/>
      </td>
      <td>
        <xsl:apply-templates select="."/>
      </td>
    </tr>
    </xsl:for-each>
</table>
</td>

</tr>
</table>
</xsl:if>

<xsl:if test="@type = 'narration'">
<p> 
<xsl:apply-templates select="phrase"/>
</p> 
</xsl:if>

</xsl:template>


<xsl:template match="phrase">
    
    
    <xsl:if test="@language='hongrois'">           
        <xsl:if test="..[@type = 'narration'] and preceding-sibling::phrase[1]/@language='francais'">
        <br/>
        </xsl:if>
        <span style="font-style: italic; color: brown;">


        <xsl:value-of select="."/>
        </span>

    </xsl:if>

    <xsl:if test="@language='francais'">
        <span style="">
        <xsl:value-of select="."/>
        </span>
    </xsl:if>
</xsl:template>


<xsl:template match="image">
  <div style="text-align: center;">
    <img>
      <xsl:attribute name="src">
        <xsl:value-of select="@path"/>
      </xsl:attribute>
    </img>
  </div>
</xsl:template>




</xsl:stylesheet>