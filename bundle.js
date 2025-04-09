/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./source/GameGrid.ts":
/*!****************************!*\
  !*** ./source/GameGrid.ts ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ GameGrid),\n/* harmony export */   generateGrid: () => (/* binding */ generateGrid)\n/* harmony export */ });\n/* harmony import */ var _GameState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameState */ \"./source/GameState.ts\");\n/* harmony import */ var _Hex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Hex */ \"./source/Hex.ts\");\n/* harmony import */ var _HexGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HexGrid */ \"./source/HexGrid.ts\");\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main */ \"./source/main.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_main__WEBPACK_IMPORTED_MODULE_3__]);\n_main__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n//#A62C2C\nconst gameStyles = {\n    radius: 30,\n    gridStroke: { color: \"#cfcfcf\", width: 3 },\n    fillColor: \"#EA7300\",\n    clueFillColor: \"#cfcfcf\",\n    fillColorHover: \"#EA7322\",\n    innerStrokeHover: { color: \"#282420\", width: 6 },\n    font: { family: \"Tahoma\", color: \"#222222\", size: 12 },\n    centralFont: { family: \"Tahoma\", color: \"#EA7300\", size: 16 },\n    textColorHover: \"#8c4d0f\",\n    congratulationColor: \"#3DAC45\",\n    honeycombAccentColor: \"#d3ac79\"\n};\nfunction generateGrid(n) {\n    let hexes = [];\n    for (let i = 0; i <= n; i++) {\n        for (let j = 0; j <= n - i; j++) {\n            if (i == 0 && j == 0)\n                continue;\n            hexes.push({ u: i, d: j });\n            hexes.push({ u: -i, d: -j });\n        }\n    }\n    for (let i = 1; i <= n; i++) {\n        for (let j = 1; j <= n; j++) {\n            hexes.push({ u: i, d: -j });\n            hexes.push({ u: -i, d: j });\n        }\n    }\n    return hexes;\n}\nclass GameGrid {\n    get activeNumber() {\n        return this._activeNumber;\n    }\n    set activeNumber(value) {\n        if (this._activeNumber == value)\n            return;\n        this._activeNumber = value;\n        this.grid.hex({ u: 0, d: 0 }).text = `${value}`;\n        if (this.grid.hoverHex && this.isBlank(this.grid.hoverHex))\n            this.grid.hex(this.grid.hoverHex).text = `${value}`;\n    }\n    isClue(hex) {\n        return (JSON.stringify(hex) in this.state.numberClues);\n    }\n    entry(hex) {\n        return Object.assign(Object.assign({}, this.state.numberClues), this.state.guesses)[JSON.stringify(hex)];\n    }\n    isBlank(hex) {\n        return !(JSON.stringify(hex) in this.state.numberClues) && !(JSON.stringify(hex) in this.state.guesses);\n    }\n    addNumberClue(hex, n) {\n        this.state.numberClues[JSON.stringify(hex)] = n;\n        delete this.state.guesses[JSON.stringify(hex)];\n        this.activeNumber = (0,_GameState__WEBPACK_IMPORTED_MODULE_0__.nextFreeNumber)(this.state, 0);\n        this.grid.hex(hex).fillColor = gameStyles.clueFillColor;\n        this.grid.hex(hex).text = `${n}`;\n    }\n    addNumberClues(clues) {\n        clues.forEach(([h, n]) => this.addNumberClue(h, n));\n    }\n    addEdgeClue(edge) {\n        this.state.edgeClues.push(edge);\n        this.grid.decorationList.push(edge);\n    }\n    addEdgeClues(clues) {\n        clues.forEach((h) => this.addEdgeClue(h));\n    }\n    markErrors(hexes) {\n        hexes.forEach((hex) => {\n            this.grid.hex(hex).fillColor = \"red\";\n            delete this.grid.hex(hex).innerStroke;\n        });\n        this.errorHexes.push(...hexes);\n        this.grid.draw();\n    }\n    unmarkErrors() {\n        this.errorHexes.forEach((hex) => {\n            if (Object.keys(this.state.numberClues).includes(JSON.stringify(hex)))\n                this.grid.hex(hex).fillColor = gameStyles.clueFillColor;\n            else\n                delete this.grid.hex(hex).fillColor;\n        });\n        this.errorHexes = [];\n        this.grid.draw();\n    }\n    startCelebrating() {\n        let increment = 75;\n        let solvedHexes = Object.assign(Object.assign({}, this.state.numberClues), this.state.guesses);\n        let solutionPath = Object.entries(solvedHexes).sort(([_1, a], [_2, b]) => a - b).map(([s, _]) => JSON.parse(s));\n        for (let i = 0; i < this.state.hexes.length; i++) {\n            setTimeout(() => { this.grid.hex(solutionPath[i]).innerStroke = { color: gameStyles.congratulationColor, width: 8 }; this.grid.draw(); }, increment * i);\n            setTimeout(() => {\n                delete this.grid.hex(solutionPath[i]).innerStroke;\n                this.grid.hex(solutionPath[i]).fillColor = gameStyles.congratulationColor;\n                this.grid.draw();\n            }, increment * (i + 0.5));\n            setTimeout(() => {\n                this.grid.hex(solutionPath[i]).fillColor = (Math.random() > 0.25) ? gameStyles.fillColor : gameStyles.honeycombAccentColor;\n                this.grid.hex(solutionPath[i]).text = (Math.random() > 0.75) ? \"🐝\" : \"\";\n                this.grid.draw();\n            }, increment * (this.state.hexes.length + 10 + Math.random() * 15));\n        }\n        setTimeout(() => {\n            let flowers = JSON.parse(localStorage.getItem(\"flowers\")) || { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };\n            console.log(flowers);\n            flowers[this.size] += 1;\n            localStorage.setItem(\"flowers\", JSON.stringify(flowers));\n            Array.from({ length: 9 }).forEach(() => (0,_main__WEBPACK_IMPORTED_MODULE_3__.addReward)(this.size, increment * 50));\n            (0,_main__WEBPACK_IMPORTED_MODULE_3__.addReward)(this.size);\n        }, increment * (this.state.hexes.length + 15));\n    }\n    constructor(canvas, size) {\n        this._activeNumber = 1;\n        this.isCelebrating = false;\n        this.errorHexes = [];\n        // let totalHexes = 3 * layers * (layers - 1);\n        this.state = {\n            hexes: [],\n            size: size,\n            numberClues: {},\n            edgeClues: [],\n            guesses: {}\n        };\n        this.size = size;\n        this.grid = new _HexGrid__WEBPACK_IMPORTED_MODULE_2__[\"default\"](canvas, {\n            radius: gameStyles.radius,\n            origin: { x: canvas.width / 2, y: canvas.height / 2 },\n            gridStroke: gameStyles.gridStroke,\n            defaultHexParams: {\n                fillColor: gameStyles.fillColor,\n                font: gameStyles.font\n            }\n        });\n        generateGrid(size).forEach((h) => { this.state.hexes.push(h); this.grid.add(h); });\n        this.grid.add({ u: 0, d: 0 }, {\n            fillColor: \"black\", text: \"1\", inactive: true,\n            font: gameStyles.centralFont\n        });\n        canvas.addEventListener(\"wheel\", (e) => {\n            if (this.isCelebrating)\n                return;\n            if (e.deltaY < 0) {\n                this.activeNumber = (0,_GameState__WEBPACK_IMPORTED_MODULE_0__.nextFreeNumber)(this.state, this.activeNumber);\n            }\n            if (e.deltaY > 0) {\n                this.activeNumber = (0,_GameState__WEBPACK_IMPORTED_MODULE_0__.prevFreeNumber)(this.state, this.activeNumber);\n            }\n            this.grid.draw();\n        });\n        window.addEventListener(\"keydown\", (e) => {\n            if (this.isCelebrating)\n                return;\n            if (e.key === \"ArrowUp\") {\n                this.activeNumber = (0,_GameState__WEBPACK_IMPORTED_MODULE_0__.nextFreeNumber)(this.state, this.activeNumber);\n            }\n            if (e.key == \"ArrowDown\") {\n                this.activeNumber = (0,_GameState__WEBPACK_IMPORTED_MODULE_0__.prevFreeNumber)(this.state, this.activeNumber);\n            }\n            this.grid.draw();\n        });\n        this.grid.onClick.push((hex) => {\n            if (this.isCelebrating)\n                return;\n            if (this.isClue(hex)) {\n                this.activeNumber = (0,_GameState__WEBPACK_IMPORTED_MODULE_0__.nextFreeNumber)(this.state, this.entry(hex));\n                return;\n            }\n            if (this.isBlank(hex)) {\n                this.grid.hex(hex).text = `${this.activeNumber}`;\n                delete this.grid.hex(hex).font;\n                this.state.guesses[JSON.stringify(hex)] = this.activeNumber;\n                this.activeNumber = (0,_GameState__WEBPACK_IMPORTED_MODULE_0__.nextFreeNumber)(this.state, this.activeNumber);\n                if (Object.keys(this.state.guesses).length + Object.keys(this.state.numberClues).length == this.state.hexes.length) {\n                    let validation = (0,_GameState__WEBPACK_IMPORTED_MODULE_0__.checkSolution)(this.state);\n                    if (validation == \"valid\") {\n                        this.isCelebrating = true;\n                        this.grid.hex({ u: 0, d: 0 }).text = `🐝`;\n                        this.grid.hex({ u: 0, d: 0 }).innerStroke = { color: \"green\", width: 5 };\n                        setTimeout(this.startCelebrating.bind(this), 300);\n                    }\n                    else {\n                        this.markErrors([validation.hexOne, validation.hexTwo]);\n                        this.grid.hex({ u: 0, d: 0 }).innerStroke = { color: \"red\", width: 5 };\n                        this.grid.hex({ u: 0, d: 0 }).text = `❌`;\n                    }\n                }\n                return;\n            }\n            this.unmarkErrors();\n            this.activeNumber = this.entry(hex);\n            this.grid.hex(hex).text = `${this.activeNumber}`;\n            this.grid.hex(hex).font = Object.assign(Object.assign({}, gameStyles.font), { color: gameStyles.textColorHover });\n            delete this.state.guesses[JSON.stringify(hex)];\n            delete this.grid.hex({ u: 0, d: 0 }).innerStroke;\n        });\n        this.grid.onMouseEnter.push((hex) => {\n            if (this.isCelebrating)\n                return;\n            if (this.errorHexes.some(h => !(0,_Hex__WEBPACK_IMPORTED_MODULE_1__.distance)(h, hex)))\n                return;\n            if (!this.isClue(hex)) {\n                this.grid.hex(hex).innerStroke = gameStyles.innerStrokeHover;\n                this.grid.hex(hex).fillColor = gameStyles.fillColorHover;\n            }\n            if (this.isBlank(hex)) {\n                this.grid.hex(hex).text = `${this.activeNumber}`;\n                this.grid.hex(hex).font = Object.assign(Object.assign({}, gameStyles.font), { color: gameStyles.textColorHover });\n            }\n        });\n        this.grid.onMouseLeave.push((hex) => {\n            if (this.isCelebrating)\n                return;\n            if (this.errorHexes.some(h => !(0,_Hex__WEBPACK_IMPORTED_MODULE_1__.distance)(h, hex)))\n                return;\n            if (!this.isClue(hex)) {\n                delete this.grid.hex(hex).innerStroke;\n                delete this.grid.hex(hex).fillColor;\n                this.grid.draw();\n            }\n            if (this.isBlank(hex)) {\n                delete this.grid.hex(hex).text;\n                delete this.grid.hex(hex).font;\n            }\n        });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://puzzleforchloe/./source/GameGrid.ts?");

/***/ }),

/***/ "./source/GameState.ts":
/*!*****************************!*\
  !*** ./source/GameState.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkSolution: () => (/* binding */ checkSolution),\n/* harmony export */   \"default\": () => (/* binding */ GameState),\n/* harmony export */   freeNumbers: () => (/* binding */ freeNumbers),\n/* harmony export */   nextFreeNumber: () => (/* binding */ nextFreeNumber),\n/* harmony export */   prevFreeNumber: () => (/* binding */ prevFreeNumber)\n/* harmony export */ });\n/* harmony import */ var _Hex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Hex */ \"./source/Hex.ts\");\n\nclass GameState {\n}\nfunction checkSolution(state) {\n    let entries = Object.assign(Object.assign({}, state.numberClues), state.guesses);\n    let prevHex = null, hex = null;\n    for (let i = 1; i <= state.hexes.length; i++) {\n        prevHex = hex;\n        hex = JSON.parse(Object.keys(entries).find(k => entries[k] == i) || \"null\");\n        if (prevHex && !(0,_Hex__WEBPACK_IMPORTED_MODULE_0__.adjacent)(hex, prevHex))\n            return { hexOne: prevHex, hexTwo: hex };\n    }\n    for (let edge of state.edgeClues) {\n        let [hexOne, hexTwo] = (0,_Hex__WEBPACK_IMPORTED_MODULE_0__.endpoints)(edge);\n        if (Math.abs(entries[JSON.stringify(hexOne)] - entries[JSON.stringify(hexTwo)]) != 1)\n            return { hexOne: hexOne, hexTwo: hexTwo };\n    }\n    return \"valid\";\n}\nfunction freeNumbers(state) {\n    return Array.from({ length: state.hexes.length }, (_, i) => i + 1).filter((i) => !Object.values(Object.assign(Object.assign({}, state.guesses), state.numberClues)).includes(i));\n}\nfunction nextFreeNumber(state, lower) {\n    let freeNums = freeNumbers(state);\n    if (!freeNums.length)\n        return undefined;\n    return freeNums.find((n) => n > lower) || freeNums[0];\n}\nfunction prevFreeNumber(state, upper) {\n    let freeNums = freeNumbers(state);\n    if (!freeNums.length)\n        return undefined;\n    return freeNums.reverse().find((n) => n < upper) || freeNums[0];\n}\n\n\n//# sourceURL=webpack://puzzleforchloe/./source/GameState.ts?");

/***/ }),

/***/ "./source/Hex.ts":
/*!***********************!*\
  !*** ./source/Hex.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   adjacent: () => (/* binding */ adjacent),\n/* harmony export */   distance: () => (/* binding */ distance),\n/* harmony export */   endpoints: () => (/* binding */ endpoints),\n/* harmony export */   fromCartesian: () => (/* binding */ fromCartesian),\n/* harmony export */   midpoint: () => (/* binding */ midpoint),\n/* harmony export */   norm: () => (/* binding */ norm),\n/* harmony export */   o: () => (/* binding */ o),\n/* harmony export */   toCartesian: () => (/* binding */ toCartesian)\n/* harmony export */ });\n;\nconst o = { u: 0, d: 0 };\nfunction distance(a, b) {\n    let l = b.u - a.u;\n    let r = b.d - a.d;\n    if ((l > 0 && r > 0) || (l < 0 && r < 0))\n        return Math.abs(l) + Math.abs(r);\n    return Math.max(Math.abs(l), Math.abs(r));\n}\nfunction adjacent(a, b) {\n    return distance(a, b) == 1;\n}\nfunction midpoint(a, b) {\n    return { u: (a.u + b.u) / 2, d: (a.d + b.d) / 2 };\n}\nfunction endpoints(edge) {\n    return [{ u: Math.floor(edge.u), d: Math.ceil(edge.d) }, { u: Math.ceil(edge.u), d: Math.floor(edge.d) }];\n}\nfunction norm(a) {\n    return distance(a, o);\n}\nfunction toCartesian(a) {\n    return { x: 1.5 * (a.d + a.u), y: Math.sqrt(3) * (a.u - a.d) / 2 };\n}\nfunction fromCartesian(coords) {\n    return {\n        u: Math.round(coords.x / 3 + coords.y / Math.sqrt(3)),\n        d: Math.round(coords.x / 3 - coords.y / Math.sqrt(3))\n    };\n}\n\n\n//# sourceURL=webpack://puzzleforchloe/./source/Hex.ts?");

/***/ }),

/***/ "./source/HexGrid.ts":
/*!***************************!*\
  !*** ./source/HexGrid.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ HexGrid)\n/* harmony export */ });\n/* harmony import */ var _Hex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Hex */ \"./source/Hex.ts\");\n\nclass HexGrid {\n    hex(h) {\n        var _a;\n        return (_a = this.hexList[JSON.stringify(h)]) === null || _a === void 0 ? void 0 : _a[1];\n    }\n    has(h) {\n        return JSON.stringify(h) in this.hexList;\n    }\n    add(h, params) {\n        this.hexList[JSON.stringify(h)] = [h, params || {}];\n    }\n    draw() {\n        let gc = this.canvas.getContext(\"2d\");\n        if (this.displayParams.boundingRect) {\n            gc.clearRect(this.displayParams.boundingRect.x, this.displayParams.boundingRect.y, this.displayParams.boundingRect.width, this.displayParams.boundingRect.height);\n        }\n        else {\n            gc.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        }\n        for (let [hex, params] of Object.values(this.hexList)) {\n            drawHex(this, hex, Object.assign(Object.assign({}, this.displayParams.defaultHexParams), params));\n        }\n        for (let dec of this.decorationList) {\n            let center = {\n                x: (0,_Hex__WEBPACK_IMPORTED_MODULE_0__.toCartesian)(dec).x * this.displayParams.radius + this.displayParams.origin.x,\n                y: -(0,_Hex__WEBPACK_IMPORTED_MODULE_0__.toCartesian)(dec).y * this.displayParams.radius + this.displayParams.origin.y,\n            };\n            gc.beginPath();\n            gc.arc(center.x, center.y, this.displayParams.radius / 4, 0, 2 * Math.PI);\n            gc.fillStyle = \"rgb(0, 0, 0, 0.6)\";\n            gc.fill();\n        }\n    }\n    eventListener(e, type) {\n        let scaledCoords = {\n            x: (e.offsetX - this.displayParams.origin.x) / this.displayParams.radius,\n            y: (this.displayParams.origin.y - e.offsetY) / this.displayParams.radius\n        };\n        let hex = (0,_Hex__WEBPACK_IMPORTED_MODULE_0__.fromCartesian)(scaledCoords);\n        switch (type) {\n            case \"click\":\n                if (this.has(hex) && !this.hex(hex).inactive)\n                    this.onClick.forEach((f) => f(hex));\n                break;\n            case \"move\":\n                if (!this.has(hex) || !!this.hex(hex).inactive) {\n                    if (this.hoverHex)\n                        this.onMouseLeave.forEach((f) => f(this.hoverHex));\n                    this.hoverHex = null;\n                    this.canvas.style.cursor = \"inherit\";\n                    break;\n                }\n                if (!this.hoverHex ||\n                    ((hex.d != this.hoverHex.d) || (hex.u != this.hoverHex.u))) {\n                    if (this.hoverHex)\n                        this.onMouseLeave.forEach((f) => f(this.hoverHex));\n                    this.onMouseEnter.forEach((f) => f(hex));\n                    this.draw();\n                }\n                this.hoverHex = hex;\n                this.canvas.style.cursor = \"pointer\";\n                break;\n        }\n        this.draw();\n        return;\n    }\n    constructor(canvas, params) {\n        this.onClick = [];\n        this.onMouseEnter = [];\n        this.onMouseLeave = [];\n        this.hoverHex = null;\n        this.hexList = {};\n        this.decorationList = [];\n        this.canvas = canvas;\n        this.displayParams = {\n            origin: { x: Math.floor(canvas.width / 2), y: Math.floor(canvas.height / 2) },\n            radius: 30,\n            gridStroke: { color: \"black\", width: 1 },\n            defaultHexParams: {}\n        };\n        Object.assign(this.displayParams, params || {});\n        canvas.addEventListener(\"mousemove\", (e) => this.eventListener(e, \"move\"));\n        canvas.addEventListener(\"click\", (e) => this.eventListener(e, \"click\"));\n        canvas.addEventListener(\"mouseleave\", (e) => {\n            if (this.hoverHex) {\n                this.onMouseLeave.forEach((f) => f(this.hoverHex));\n                this.hoverHex = null;\n                this.draw();\n            }\n        });\n    }\n}\nfunction stringifyColor(c) {\n    if (typeof c == 'string')\n        return c;\n    if (c[3] !== undefined)\n        return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;\n    return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${c[3]})`;\n}\nfunction getHexPath(center, radius) {\n    let hexPath = new Path2D();\n    hexPath.moveTo(center.x + radius, center.y);\n    hexPath.lineTo(center.x + (1 / 2) * radius, center.y + (Math.sqrt(3) / 2) * radius);\n    hexPath.lineTo(center.x - (1 / 2) * radius, center.y + (Math.sqrt(3) / 2) * radius);\n    hexPath.lineTo(center.x - radius, center.y);\n    hexPath.lineTo(center.x - (1 / 2) * radius, center.y - (Math.sqrt(3) / 2) * radius);\n    hexPath.lineTo(center.x + (1 / 2) * radius, center.y - (Math.sqrt(3) / 2) * radius);\n    hexPath.closePath();\n    return hexPath;\n}\nfunction drawHex(grid, hex, params) {\n    var _a, _b, _c;\n    let center = {\n        x: (0,_Hex__WEBPACK_IMPORTED_MODULE_0__.toCartesian)(hex).x * grid.displayParams.radius + grid.displayParams.origin.x,\n        y: -(0,_Hex__WEBPACK_IMPORTED_MODULE_0__.toCartesian)(hex).y * grid.displayParams.radius + grid.displayParams.origin.y,\n    };\n    let gc = grid.canvas.getContext(\"2d\");\n    if (grid.displayParams.boundingRect) {\n        let path = new Path2D();\n        path.rect(grid.displayParams.boundingRect.x, grid.displayParams.boundingRect.y, grid.displayParams.boundingRect.width, grid.displayParams.boundingRect.height);\n        gc.clip(path);\n    }\n    let hexPath = getHexPath(center, grid.displayParams.radius);\n    if (!params.innerStroke) {\n        gc.fillStyle = stringifyColor(params.fillColor || \"transparent\");\n        gc.fill(hexPath);\n    }\n    else {\n        gc.fillStyle = stringifyColor(params.innerStroke.color);\n        gc.fill(hexPath);\n        let innerHexPath = getHexPath(center, grid.displayParams.radius\n            - params.innerStroke.width - Math.floor(grid.displayParams.gridStroke.width / 2));\n        gc.globalCompositeOperation = \"destination-out\";\n        gc.fillStyle = stringifyColor(\"black\");\n        gc.fill(innerHexPath);\n        gc.globalCompositeOperation = \"source-over\";\n        gc.fillStyle = stringifyColor(params.fillColor || \"transparent\");\n        gc.fill(innerHexPath);\n    }\n    if (grid.displayParams.gridStroke) {\n        gc.lineWidth = grid.displayParams.gridStroke.width;\n        gc.strokeStyle = stringifyColor(grid.displayParams.gridStroke.color);\n        gc.stroke(hexPath);\n    }\n    if (params.text) {\n        gc.font = `${((_a = params.font) === null || _a === void 0 ? void 0 : _a.size) || 12}pt ${((_b = params.font) === null || _b === void 0 ? void 0 : _b.family) || \"sans-serif\"}`;\n        gc.textBaseline = \"middle\";\n        gc.textAlign = \"center\";\n        gc.fillStyle = stringifyColor(((_c = params.font) === null || _c === void 0 ? void 0 : _c.color) || \"Black\");\n        gc.fillText(params.text, center.x, center.y, grid.displayParams.radius);\n    }\n}\n\n\n//# sourceURL=webpack://puzzleforchloe/./source/HexGrid.ts?");

/***/ }),

/***/ "./source/main.ts":
/*!************************!*\
  !*** ./source/main.ts ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addReward: () => (/* binding */ addReward)\n/* harmony export */ });\n/* harmony import */ var _GameGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameGrid */ \"./source/GameGrid.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_GameGrid__WEBPACK_IMPORTED_MODULE_0__]);\n_GameGrid__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst puzzles = await (await fetch(\"/puzzles.json\", {\n    method: \"GET\"\n})).json();\nconst canvasContainer = document.getElementById(\"canvasContainer\");\nlet canvas;\nlet game;\nlet startButtons = [2, 3, 4, 5, 6].map((n) => document.getElementById(`start_${n}`));\nlet activeButton = 4;\nfunction startPuzzle(size) {\n    if (canvas)\n        canvas.remove();\n    canvas = document.createElement(\"canvas\");\n    canvas.width = 60 * (2 * size + 2);\n    canvas.height = 60 * (2 * size + 2);\n    canvasContainer.append(canvas);\n    game = new _GameGrid__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas, size);\n    let puzzleId = Math.floor(Math.random() * puzzles[size].length);\n    let [numberClues, edgeClues] = puzzles[size][puzzleId];\n    game.addNumberClues(Object.entries(numberClues).map(([s, n]) => [JSON.parse(s), n]));\n    game.addEdgeClues(edgeClues);\n    game.grid.draw();\n    startButtons[activeButton].classList.remove(\"active\");\n    activeButton = size - 2;\n    startButtons[activeButton].classList.add(\"active\");\n    console.log(puzzleId);\n}\nfunction addReward(level, increment) {\n    let container = document.getElementById(\"flowerLayer\");\n    let flower = document.createElement(\"div\");\n    flower.classList.add(`reward_${level}`);\n    flower.style.top = `${Math.floor(Math.random() * 100)}%`;\n    flower.style.left = `${Math.floor(Math.random() * 100)}%`;\n    container.append(flower);\n    if (increment)\n        setTimeout(() => { flower.remove(); }, increment);\n}\nfunction retrieveFlowers() {\n    let flowers = JSON.parse(localStorage.getItem(\"flowers\")) || { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };\n    for (let i = 2; i <= 6; i++) {\n        Array.from({ length: flowers[i] }).forEach(() => addReward(i));\n    }\n}\nstartButtons.forEach((button, index) => button.addEventListener(\"click\", () => startPuzzle(index + 2)));\nstartPuzzle(4);\nretrieveFlowers();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://puzzleforchloe/./source/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./source/main.ts");
/******/ 	
/******/ })()
;
