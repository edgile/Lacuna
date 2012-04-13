﻿<%@ Page Language="C#" AutoEventWireup="true" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Lacuna</title>
    <script type="text/javascript" src="scripts/utils/three.js"></script>
    <script type="text/javascript" src="scripts/utils/stats.js"></script>
    <script type="text/javascript" src="scripts/utils/inheritance.js"></script>
    <script type="text/javascript" src="scripts/common.js"></script>
    <script type="text/javascript" src="scripts/SpaceObjects/spaceobject.js"></script>
    <script type="text/javascript" src="scripts/SpaceObjects/launchplatform.js"></script>
    <script type="text/javascript" src="scripts/SpaceObjects/planet.js"></script>
    <script type="text/javascript" src="scripts/SpaceObjects/star.js"></script>
    <script type="text/javascript" src="scripts/SpaceObjects/ship.js"></script>
    <script type="text/javascript" src="scripts/space.js"></script>
    <script type="text/javascript" src="scripts/canvas.js"></script>
</head>
<body onload="initialize();" style="margin:10px;width:100%;height:100%;text-align:center">
    <canvas id="canvas" width=700 height=500 style="border: 1px;border-color:Orange;border-style:dotted;background-color:Black">This browser does not support canvas.</canvas>
</body>
</html>
