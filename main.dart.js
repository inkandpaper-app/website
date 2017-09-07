(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isa=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isf)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="a"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="k"){processStatics(init.statics[b1]=b2.k,b3)
delete b2.k}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$D=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$S=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$D=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bC"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bC"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bC(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.w=function(){}
var dart=[["","",,H,{"^":"",ie:{"^":"a;a"}}],["","",,J,{"^":"",
m:function(a){return void 0},
b9:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
b6:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.bG==null){H.hk()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.cI("Return interceptor for "+H.d(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$bi()]
if(v!=null)return v
v=H.hu(a)
if(v!=null)return v
if(typeof a=="function")return C.y
y=Object.getPrototypeOf(a)
if(y==null)return C.n
if(y===Object.prototype)return C.n
if(typeof w=="function"){Object.defineProperty(w,$.$get$bi(),{value:C.j,enumerable:false,writable:true,configurable:true})
return C.j}return C.j},
f:{"^":"a;",
n:function(a,b){return a===b},
gp:function(a){return H.U(a)},
h:["bI",function(a){return H.aU(a)}],
"%":"Blob|CanvasRenderingContext2D|Client|DOMError|File|FileError|MediaError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|Screen|WindowClient"},
e1:{"^":"f;",
h:function(a){return String(a)},
gp:function(a){return a?519018:218159},
$isfT:1},
e2:{"^":"f;",
n:function(a,b){return null==b},
h:function(a){return"null"},
gp:function(a){return 0}},
bj:{"^":"f;",
gp:function(a){return 0},
h:["bJ",function(a){return String(a)}],
$ise3:1},
eh:{"^":"bj;"},
aY:{"^":"bj;"},
aw:{"^":"bj;",
h:function(a){var z=a[$.$get$bV()]
return z==null?this.bJ(a):J.Q(z)},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
au:{"^":"f;$ti",
bb:function(a,b){if(!!a.immutable$list)throw H.e(new P.A(b))},
ci:function(a,b){if(!!a.fixed$length)throw H.e(new P.A(b))},
M:function(a,b){return new H.bm(a,b,[H.a6(a,0),null])},
v:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
gcr:function(a){if(a.length>0)return a[0]
throw H.e(H.c9())},
aH:function(a,b,c,d,e){var z,y,x
this.bb(a,"setRange")
P.cr(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.q(P.Y(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.e(H.e0())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.b(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.b(d,x)
a[b+y]=d[x]}},
h:function(a){return P.aO(a,"[","]")},
gu:function(a){return new J.bd(a,a.length,0,null)},
gp:function(a){return H.U(a)},
gj:function(a){return a.length},
sj:function(a,b){this.ci(a,"set length")
if(b<0)throw H.e(P.Y(b,0,null,"newLength",null))
a.length=b},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.p(a,b))
if(b>=a.length||b<0)throw H.e(H.p(a,b))
return a[b]},
t:function(a,b,c){this.bb(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.p(a,b))
if(b>=a.length||b<0)throw H.e(H.p(a,b))
a[b]=c},
$isy:1,
$asy:I.w,
$isi:1,
$asi:null,
$ish:1,
$ash:null},
id:{"^":"au;$ti"},
bd:{"^":"a;a,b,c,d",
gm:function(){return this.d},
l:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(H.dd(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
av:{"^":"f;",
aG:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.A(""+a+".toInt()"))},
P:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.e(new P.A(""+a+".round()"))},
h:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gp:function(a){return a&0x1FFFFFFF},
a2:function(a,b){if(typeof b!=="number")throw H.e(H.a3(b))
return a+b},
I:function(a,b){return(a|0)===a?a/b|0:this.cc(a,b)},
cc:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.e(new P.A("Result of truncating division is "+H.d(z)+": "+H.d(a)+" ~/ "+b))},
ax:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ab:function(a,b){if(typeof b!=="number")throw H.e(H.a3(b))
return a<b},
$isaE:1},
cc:{"^":"av;",$isaE:1,$isj:1},
cb:{"^":"av;",$isaE:1},
aP:{"^":"f;",
bc:function(a,b){if(b<0)throw H.e(H.p(a,b))
if(b>=a.length)H.q(H.p(a,b))
return a.charCodeAt(b)},
ak:function(a,b){if(b>=a.length)throw H.e(H.p(a,b))
return a.charCodeAt(b)},
a2:function(a,b){if(typeof b!=="string")throw H.e(P.bP(b,null,null))
return a+b},
ad:function(a,b,c){if(c==null)c=a.length
H.h9(c)
if(b<0)throw H.e(P.aV(b,null,null))
if(typeof c!=="number")return H.O(c)
if(b>c)throw H.e(P.aV(b,null,null))
if(c>a.length)throw H.e(P.aV(c,null,null))
return a.substring(b,c)},
bH:function(a,b){return this.ad(a,b,null)},
cT:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.ak(z,0)===133){x=J.e4(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.bc(z,w)===133?J.e5(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
ck:function(a,b,c){if(c>a.length)throw H.e(P.Y(c,0,a.length,null,null))
return H.hG(a,b,c)},
h:function(a){return a},
gp:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gj:function(a){return a.length},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.p(a,b))
if(b>=a.length||b<0)throw H.e(H.p(a,b))
return a[b]},
$isy:1,
$asy:I.w,
$isZ:1,
k:{
cd:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
e4:function(a,b){var z,y
for(z=a.length;b<z;){y=C.h.ak(a,b)
if(y!==32&&y!==13&&!J.cd(y))break;++b}return b},
e5:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.h.bc(a,z)
if(y!==32&&y!==13&&!J.cd(y))break}return b}}}}],["","",,H,{"^":"",
c9:function(){return new P.bs("No element")},
e0:function(){return new P.bs("Too few elements")},
h:{"^":"K;$ti",$ash:null},
ax:{"^":"h;$ti",
gu:function(a){return new H.ce(this,this.gj(this),0,null)},
M:function(a,b){return new H.bm(this,b,[H.r(this,"ax",0),null])},
a0:function(a,b){var z,y,x
z=H.t([],[H.r(this,"ax",0)])
C.d.sj(z,this.gj(this))
for(y=0;y<this.gj(this);++y){x=this.v(0,y)
if(y>=z.length)return H.b(z,y)
z[y]=x}return z},
a_:function(a){return this.a0(a,!0)}},
ce:{"^":"a;a,b,c,d",
gm:function(){return this.d},
l:function(){var z,y,x,w
z=this.a
y=J.H(z)
x=y.gj(z)
if(this.b!==x)throw H.e(new P.ac(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.v(z,w);++this.c
return!0}},
aR:{"^":"K;a,b,$ti",
gu:function(a){return new H.ed(null,J.aI(this.a),this.b,this.$ti)},
gj:function(a){return J.aa(this.a)},
v:function(a,b){return this.b.$1(J.aH(this.a,b))},
$asK:function(a,b){return[b]},
k:{
aS:function(a,b,c,d){if(!!a.$ish)return new H.c1(a,b,[c,d])
return new H.aR(a,b,[c,d])}}},
c1:{"^":"aR;a,b,$ti",$ish:1,
$ash:function(a,b){return[b]}},
ed:{"^":"ca;a,b,c,$ti",
l:function(){var z=this.b
if(z.l()){this.a=this.c.$1(z.gm())
return!0}this.a=null
return!1},
gm:function(){return this.a}},
bm:{"^":"ax;a,b,$ti",
gj:function(a){return J.aa(this.a)},
v:function(a,b){return this.b.$1(J.aH(this.a,b))},
$asax:function(a,b){return[b]},
$ash:function(a,b){return[b]},
$asK:function(a,b){return[b]}},
eJ:{"^":"K;a,b,$ti",
gu:function(a){return new H.eK(J.aI(this.a),this.b,this.$ti)},
M:function(a,b){return new H.aR(this,b,[H.a6(this,0),null])}},
eK:{"^":"ca;a,b,$ti",
l:function(){var z,y
for(z=this.a,y=this.b;z.l();)if(y.$1(z.gm())===!0)return!0
return!1},
gm:function(){return this.a.gm()}},
c4:{"^":"a;$ti"}}],["","",,H,{"^":"",
aA:function(a,b){var z=a.T(b)
if(!init.globalState.d.cy)init.globalState.f.Z()
return z},
dc:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.m(y).$isi)throw H.e(P.bN("Arguments to main must be a List: "+H.d(y)))
init.globalState=new H.fo(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$c7()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.f0(P.bl(null,H.az),0)
x=P.j
y.z=new H.X(0,null,null,null,null,null,0,[x,H.bx])
y.ch=new H.X(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.fn()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.dU,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.fp)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.ag(null,null,null,x)
v=new H.aW(0,null,!1)
u=new H.bx(y,new H.X(0,null,null,null,null,null,0,[x,H.aW]),w,init.createNewIsolate(),v,new H.W(H.ba()),new H.W(H.ba()),!1,!1,[],P.ag(null,null,null,null),null,null,!1,!0,P.ag(null,null,null,null))
w.B(0,0)
u.aK(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.a4(a,{func:1,args:[,]}))u.T(new H.hE(z,a))
else if(H.a4(a,{func:1,args:[,,]}))u.T(new H.hF(z,a))
else u.T(a)
init.globalState.f.Z()},
dY:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.dZ()
return},
dZ:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.A("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.A('Cannot extract URI from "'+z+'"'))},
dU:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.b_(!0,[]).J(b.data)
y=J.H(z)
switch(y.i(z,"command")){case"start":init.globalState.b=y.i(z,"id")
x=y.i(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.i(z,"args")
u=new H.b_(!0,[]).J(y.i(z,"msg"))
t=y.i(z,"isSpawnUri")
s=y.i(z,"startPaused")
r=new H.b_(!0,[]).J(y.i(z,"replyTo"))
y=init.globalState.a++
q=P.j
p=P.ag(null,null,null,q)
o=new H.aW(0,null,!1)
n=new H.bx(y,new H.X(0,null,null,null,null,null,0,[q,H.aW]),p,init.createNewIsolate(),o,new H.W(H.ba()),new H.W(H.ba()),!1,!1,[],P.ag(null,null,null,null),null,null,!1,!0,P.ag(null,null,null,null))
p.B(0,0)
n.aK(0,o)
init.globalState.f.a.D(new H.az(n,new H.dV(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.Z()
break
case"spawn-worker":break
case"message":if(y.i(z,"port")!=null)y.i(z,"port").F(y.i(z,"msg"))
init.globalState.f.Z()
break
case"close":init.globalState.ch.Y(0,$.$get$c8().i(0,a))
a.terminate()
init.globalState.f.Z()
break
case"log":H.dT(y.i(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.af(["command","print","msg",z])
q=new H.a0(!0,P.ak(null,P.j)).A(q)
y.toString
self.postMessage(q)}else P.bJ(y.i(z,"msg"))
break
case"error":throw H.e(y.i(z,"msg"))}},
dT:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.af(["command","log","msg",a])
x=new H.a0(!0,P.ak(null,P.j)).A(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.J(w)
z=H.I(w)
y=P.aM(z)
throw H.e(y)}},
dW:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cn=$.cn+("_"+y)
$.co=$.co+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.F(["spawned",new H.b1(y,x),w,z.r])
x=new H.dX(a,b,c,d,z)
if(e===!0){z.b9(w,w)
init.globalState.f.a.D(new H.az(z,x,"start isolate"))}else x.$0()},
fB:function(a){return new H.b_(!0,[]).J(new H.a0(!1,P.ak(null,P.j)).A(a))},
hE:{"^":"c:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
hF:{"^":"c:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
fo:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",k:{
fp:function(a){var z=P.af(["command","print","msg",a])
return new H.a0(!0,P.ak(null,P.j)).A(z)}}},
bx:{"^":"a;a,b,c,cG:d<,cl:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
b9:function(a,b){if(!this.f.n(0,a))return
if(this.Q.B(0,b)&&!this.y)this.y=!0
this.ay()},
cN:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.Y(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.b(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.b(v,w)
v[w]=x
if(w===y.c)y.aR();++y.d}this.y=!1}this.ay()},
cf:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.n(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.b(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
cM:function(a){var z,y,x
if(this.ch==null)return
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.n(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.q(new P.A("removeRange"))
P.cr(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
bE:function(a,b){if(!this.r.n(0,a))return
this.db=b},
cv:function(a,b,c){var z=J.m(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){a.F(c)
return}z=this.cx
if(z==null){z=P.bl(null,null)
this.cx=z}z.D(new H.fi(a,c))},
cu:function(a,b){var z
if(!this.r.n(0,a))return
z=J.m(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){this.aB()
return}z=this.cx
if(z==null){z=P.bl(null,null)
this.cx=z}z.D(this.gcH())},
cw:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.bJ(a)
if(b!=null)P.bJ(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.Q(a)
y[1]=b==null?null:J.Q(b)
for(x=new P.by(z,z.r,null,null),x.c=z.e;x.l();)x.d.F(y)},
T:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.J(u)
v=H.I(u)
this.cw(w,v)
if(this.db===!0){this.aB()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gcG()
if(this.cx!=null)for(;t=this.cx,!t.gE(t);)this.cx.bl().$0()}return y},
bj:function(a){return this.b.i(0,a)},
aK:function(a,b){var z=this.b
if(z.bd(a))throw H.e(P.aM("Registry: ports must be registered only once."))
z.t(0,a,b)},
ay:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.t(0,this.a,this)
else this.aB()},
aB:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.O(0)
for(z=this.b,y=z.gbs(z),y=y.gu(y);y.l();)y.gm().bW()
z.O(0)
this.c.O(0)
init.globalState.z.Y(0,this.a)
this.dx.O(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.b(z,v)
w.F(z[v])}this.ch=null}},"$0","gcH",0,0,2]},
fi:{"^":"c:2;a,b",
$0:function(){this.a.F(this.b)}},
f0:{"^":"a;a,b",
cm:function(){var z=this.a
if(z.b===z.c)return
return z.bl()},
bp:function(){var z,y,x
z=this.cm()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.bd(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gE(y)}else y=!1
else y=!1
else y=!1
if(y)H.q(P.aM("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gE(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.af(["command","close"])
x=new H.a0(!0,new P.cQ(0,null,null,null,null,null,0,[null,P.j])).A(x)
y.toString
self.postMessage(x)}return!1}z.cL()
return!0},
b2:function(){if(self.window!=null)new H.f1(this).$0()
else for(;this.bp(););},
Z:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.b2()
else try{this.b2()}catch(x){z=H.J(x)
y=H.I(x)
w=init.globalState.Q
v=P.af(["command","error","msg",H.d(z)+"\n"+H.d(y)])
v=new H.a0(!0,P.ak(null,P.j)).A(v)
w.toString
self.postMessage(v)}}},
f1:{"^":"c:2;a",
$0:function(){if(!this.a.bp())return
P.cw(C.k,this)}},
az:{"^":"a;a,b,c",
cL:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.T(this.b)}},
fn:{"^":"a;"},
dV:{"^":"c:1;a,b,c,d,e,f",
$0:function(){H.dW(this.a,this.b,this.c,this.d,this.e,this.f)}},
dX:{"^":"c:2;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.a4(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.a4(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.ay()}},
cK:{"^":"a;"},
b1:{"^":"cK;b,a",
F:function(a){var z,y,x
z=init.globalState.z.i(0,this.a)
if(z==null)return
y=this.b
if(y.gaU())return
x=H.fB(a)
if(z.gcl()===y){y=J.H(x)
switch(y.i(x,0)){case"pause":z.b9(y.i(x,1),y.i(x,2))
break
case"resume":z.cN(y.i(x,1))
break
case"add-ondone":z.cf(y.i(x,1),y.i(x,2))
break
case"remove-ondone":z.cM(y.i(x,1))
break
case"set-errors-fatal":z.bE(y.i(x,1),y.i(x,2))
break
case"ping":z.cv(y.i(x,1),y.i(x,2),y.i(x,3))
break
case"kill":z.cu(y.i(x,1),y.i(x,2))
break
case"getErrors":y=y.i(x,1)
z.dx.B(0,y)
break
case"stopErrors":y=y.i(x,1)
z.dx.Y(0,y)
break}return}init.globalState.f.a.D(new H.az(z,new H.fr(this,x),"receive"))},
n:function(a,b){if(b==null)return!1
return b instanceof H.b1&&J.V(this.b,b.b)},
gp:function(a){return this.b.gaq()}},
fr:{"^":"c:1;a,b",
$0:function(){var z=this.a.b
if(!z.gaU())z.bS(this.b)}},
bz:{"^":"cK;b,c,a",
F:function(a){var z,y,x
z=P.af(["command","message","port",this,"msg",a])
y=new H.a0(!0,P.ak(null,P.j)).A(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.i(0,this.b)
if(x!=null)x.postMessage(y)}},
n:function(a,b){if(b==null)return!1
return b instanceof H.bz&&J.V(this.b,b.b)&&J.V(this.a,b.a)&&J.V(this.c,b.c)},
gp:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.bF()
y=this.a
if(typeof y!=="number")return y.bF()
x=this.c
if(typeof x!=="number")return H.O(x)
return(z<<16^y<<8^x)>>>0}},
aW:{"^":"a;aq:a<,b,aU:c<",
bW:function(){this.c=!0
this.b=null},
bS:function(a){if(this.c)return
this.b.$1(a)},
$iseq:1},
eD:{"^":"a;a,b,c",
a9:function(){if(self.setTimeout!=null){if(this.b)throw H.e(new P.A("Timer in event loop cannot be canceled."))
var z=this.c
if(z==null)return;--init.globalState.f.b
self.clearTimeout(z)
this.c=null}else throw H.e(new P.A("Canceling a timer."))},
bN:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.D(new H.az(y,new H.eF(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ap(new H.eG(this,b),0),a)}else throw H.e(new P.A("Timer greater than 0."))},
k:{
eE:function(a,b){var z=new H.eD(!0,!1,null)
z.bN(a,b)
return z}}},
eF:{"^":"c:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
eG:{"^":"c:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
W:{"^":"a;aq:a<",
gp:function(a){var z=this.a
if(typeof z!=="number")return z.cW()
z=C.a.ax(z,0)^C.a.I(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
n:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.W){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
a0:{"^":"a;a,b",
A:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.i(0,a)
if(y!=null)return["ref",y]
z.t(0,a,z.gj(z))
z=J.m(a)
if(!!z.$iscf)return["buffer",a]
if(!!z.$isbp)return["typed",a]
if(!!z.$isy)return this.bA(a)
if(!!z.$isdS){x=this.gbx()
w=a.gbh()
w=H.aS(w,x,H.r(w,"K",0),null)
w=P.aQ(w,!0,H.r(w,"K",0))
z=z.gbs(a)
z=H.aS(z,x,H.r(z,"K",0),null)
return["map",w,P.aQ(z,!0,H.r(z,"K",0))]}if(!!z.$ise3)return this.bB(a)
if(!!z.$isf)this.br(a)
if(!!z.$iseq)this.a1(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isb1)return this.bC(a)
if(!!z.$isbz)return this.bD(a)
if(!!z.$isc){v=a.$static_name
if(v==null)this.a1(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isW)return["capability",a.a]
if(!(a instanceof P.a))this.br(a)
return["dart",init.classIdExtractor(a),this.bz(init.classFieldsExtractor(a))]},"$1","gbx",2,0,0],
a1:function(a,b){throw H.e(new P.A((b==null?"Can't transmit:":b)+" "+H.d(a)))},
br:function(a){return this.a1(a,null)},
bA:function(a){var z=this.by(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.a1(a,"Can't serialize indexable: ")},
by:function(a){var z,y,x
z=[]
C.d.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.A(a[y])
if(y>=z.length)return H.b(z,y)
z[y]=x}return z},
bz:function(a){var z
for(z=0;z<a.length;++z)C.d.t(a,z,this.A(a[z]))
return a},
bB:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.a1(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.d.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.A(a[z[x]])
if(x>=y.length)return H.b(y,x)
y[x]=w}return["js-object",z,y]},
bD:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
bC:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaq()]
return["raw sendport",a]}},
b_:{"^":"a;a,b",
J:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.bN("Bad serialized message: "+H.d(a)))
switch(C.d.gcr(a)){case"ref":if(1>=a.length)return H.b(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.b(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
y=H.t(this.S(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return H.t(this.S(x),[null])
case"mutable":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return this.S(x)
case"const":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
y=H.t(this.S(x),[null])
y.fixed$length=Array
return y
case"map":return this.cp(a)
case"sendport":return this.cq(a)
case"raw sendport":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.co(a)
case"function":if(1>=a.length)return H.b(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.b(a,1)
return new H.W(a[1])
case"dart":y=a.length
if(1>=y)return H.b(a,1)
w=a[1]
if(2>=y)return H.b(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.S(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.e("couldn't deserialize: "+H.d(a))}},"$1","gcn",2,0,0],
S:function(a){var z,y,x
z=J.H(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.O(x)
if(!(y<x))break
z.t(a,y,this.J(z.i(a,y)));++y}return a},
cp:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.b(a,1)
y=a[1]
if(2>=z)return H.b(a,2)
x=a[2]
w=P.eb()
this.b.push(w)
y=J.dk(y,this.gcn()).a_(0)
for(z=J.H(y),v=J.H(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.b(y,u)
w.t(0,y[u],this.J(v.i(x,u)))}return w},
cq:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.b(a,1)
y=a[1]
if(2>=z)return H.b(a,2)
x=a[2]
if(3>=z)return H.b(a,3)
w=a[3]
if(J.V(y,init.globalState.b)){v=init.globalState.z.i(0,x)
if(v==null)return
u=v.bj(w)
if(u==null)return
t=new H.b1(u,x)}else t=new H.bz(y,w,x)
this.b.push(t)
return t},
co:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.b(a,1)
y=a[1]
if(2>=z)return H.b(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.H(y)
v=J.H(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.O(t)
if(!(u<t))break
w[z.i(y,u)]=this.J(v.i(x,u));++u}return w}}}],["","",,H,{"^":"",
hf:function(a){return init.types[a]},
ht:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.m(a).$isE},
d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.Q(a)
if(typeof z!=="string")throw H.e(H.a3(a))
return z},
U:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cm:function(a,b){throw H.e(new P.dK("Invalid double",a,null))},
ep:function(a,b){var z,y
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return H.cm(a,b)
z=parseFloat(a)
if(isNaN(z)){y=C.h.cT(a)
if(y==="NaN"||y==="+NaN"||y==="-NaN")return z
return H.cm(a,b)}return z},
br:function(a){var z,y,x,w,v,u,t,s
z=J.m(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.q||!!J.m(a).$isaY){v=C.m(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.h.ak(w,0)===36)w=C.h.bH(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.d5(H.b7(a),0,null),init.mangledGlobalNames)},
aU:function(a){return"Instance of '"+H.br(a)+"'"},
z:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
eo:function(a){return a.b?H.z(a).getUTCFullYear()+0:H.z(a).getFullYear()+0},
em:function(a){return a.b?H.z(a).getUTCMonth()+1:H.z(a).getMonth()+1},
ei:function(a){return a.b?H.z(a).getUTCDate()+0:H.z(a).getDate()+0},
ej:function(a){return a.b?H.z(a).getUTCHours()+0:H.z(a).getHours()+0},
el:function(a){return a.b?H.z(a).getUTCMinutes()+0:H.z(a).getMinutes()+0},
en:function(a){return a.b?H.z(a).getUTCSeconds()+0:H.z(a).getSeconds()+0},
ek:function(a){return a.b?H.z(a).getUTCMilliseconds()+0:H.z(a).getMilliseconds()+0},
bq:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.a3(a))
return a[b]},
cp:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.a3(a))
a[b]=c},
O:function(a){throw H.e(H.a3(a))},
b:function(a,b){if(a==null)J.aa(a)
throw H.e(H.p(a,b))},
p:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.R(!0,b,"index",null)
z=J.aa(a)
if(!(b<0)){if(typeof z!=="number")return H.O(z)
y=b>=z}else y=!0
if(y)return P.ae(b,a,"index",null,z)
return P.aV(b,"index",null)},
a3:function(a){return new P.R(!0,a,null,null)},
F:function(a){return a},
h9:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(H.a3(a))
return a},
e:function(a){var z
if(a==null)a=new P.cl()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.df})
z.name=""}else z.toString=H.df
return z},
df:function(){return J.Q(this.dartException)},
q:function(a){throw H.e(a)},
dd:function(a){throw H.e(new P.ac(a))},
J:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.hJ(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.ax(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bk(H.d(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.d(y)+" (Error "+w+")"
return z.$1(new H.ck(v,null))}}if(a instanceof TypeError){u=$.$get$cx()
t=$.$get$cy()
s=$.$get$cz()
r=$.$get$cA()
q=$.$get$cE()
p=$.$get$cF()
o=$.$get$cC()
$.$get$cB()
n=$.$get$cH()
m=$.$get$cG()
l=u.C(y)
if(l!=null)return z.$1(H.bk(y,l))
else{l=t.C(y)
if(l!=null){l.method="call"
return z.$1(H.bk(y,l))}else{l=s.C(y)
if(l==null){l=r.C(y)
if(l==null){l=q.C(y)
if(l==null){l=p.C(y)
if(l==null){l=o.C(y)
if(l==null){l=r.C(y)
if(l==null){l=n.C(y)
if(l==null){l=m.C(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.ck(y,l==null?null:l.method))}}return z.$1(new H.eI(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.ct()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.R(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.ct()
return a},
I:function(a){var z
if(a==null)return new H.cR(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.cR(a,null)},
hA:function(a){if(a==null||typeof a!='object')return J.P(a)
else return H.U(a)},
hc:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.t(0,a[y],a[x])}return b},
hn:function(a,b,c,d,e,f,g){switch(c){case 0:return H.aA(b,new H.ho(a))
case 1:return H.aA(b,new H.hp(a,d))
case 2:return H.aA(b,new H.hq(a,d,e))
case 3:return H.aA(b,new H.hr(a,d,e,f))
case 4:return H.aA(b,new H.hs(a,d,e,f,g))}throw H.e(P.aM("Unsupported number of arguments for wrapped closure"))},
ap:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.hn)
a.$identity=z
return z},
du:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.m(c).$isi){z.$reflectionInfo=c
x=H.es(z).r}else x=c
w=d?Object.create(new H.ew().constructor.prototype):Object.create(new H.be(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.L
$.L=J.a9(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.bT(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.hf,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.bR:H.bf
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.bT(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
dr:function(a,b,c,d){var z=H.bf
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
bT:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.dt(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.dr(y,!w,z,b)
if(y===0){w=$.L
$.L=J.a9(w,1)
u="self"+H.d(w)
w="return function(){var "+u+" = this."
v=$.ab
if(v==null){v=H.aK("self")
$.ab=v}return new Function(w+H.d(v)+";return "+u+"."+H.d(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.L
$.L=J.a9(w,1)
t+=H.d(w)
w="return function("+t+"){return this."
v=$.ab
if(v==null){v=H.aK("self")
$.ab=v}return new Function(w+H.d(v)+"."+H.d(z)+"("+t+");}")()},
ds:function(a,b,c,d){var z,y
z=H.bf
y=H.bR
switch(b?-1:a){case 0:throw H.e(new H.et("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
dt:function(a,b){var z,y,x,w,v,u,t,s
z=H.dn()
y=$.bQ
if(y==null){y=H.aK("receiver")
$.bQ=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.ds(w,!u,x,b)
if(w===1){y="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
u=$.L
$.L=J.a9(u,1)
return new Function(y+H.d(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
u=$.L
$.L=J.a9(u,1)
return new Function(y+H.d(u)+"}")()},
bC:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.m(c).$isi){c.fixed$length=Array
z=c}else z=c
return H.du(a,b,z,!!d,e,f)},
hC:function(a,b){var z=J.H(b)
throw H.e(H.dq(H.br(a),z.ad(b,3,z.gj(b))))},
hm:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.m(a)[b]
else z=!0
if(z)return a
H.hC(a,b)},
ha:function(a){var z=J.m(a)
return"$S" in z?z.$S():null},
a4:function(a,b){var z
if(a==null)return!1
z=H.ha(a)
return z==null?!1:H.d4(z,b)},
hI:function(a){throw H.e(new P.dy(a))},
ba:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
d2:function(a){return init.getIsolateTag(a)},
t:function(a,b){a.$ti=b
return a},
b7:function(a){if(a==null)return
return a.$ti},
d3:function(a,b){return H.bK(a["$as"+H.d(b)],H.b7(a))},
r:function(a,b,c){var z=H.d3(a,b)
return z==null?null:z[c]},
a6:function(a,b){var z=H.b7(a)
return z==null?null:z[b]},
a7:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.d5(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.d(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.a7(z,b)
return H.fC(a,b)}return"unknown-reified-type"},
fC:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.a7(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.a7(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.a7(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.hb(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.a7(r[p],b)+(" "+H.d(p))}w+="}"}return"("+w+") => "+z},
d5:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bt("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.q=v+", "
u=a[y]
if(u!=null)w=!1
v=z.q+=H.a7(u,c)}return w?"":"<"+z.h(0)+">"},
bK:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
d0:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.b7(a)
y=J.m(a)
if(y[b]==null)return!1
return H.cZ(H.bK(y[d],z),c)},
cZ:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.D(a[y],b[y]))return!1
return!0},
d1:function(a,b,c){return a.apply(b,H.d3(b,c))},
D:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="aT")return!0
if('func' in b)return H.d4(a,b)
if('func' in a)return b.builtin$cls==="i9"||b.builtin$cls==="a"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.a7(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.cZ(H.bK(u,z),x)},
cY:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.D(z,v)||H.D(v,z)))return!1}return!0},
fM:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.D(v,u)||H.D(u,v)))return!1}return!0},
d4:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.D(z,y)||H.D(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.cY(x,w,!1))return!1
if(!H.cY(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.D(o,n)||H.D(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.D(o,n)||H.D(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.D(o,n)||H.D(n,o)))return!1}}return H.fM(a.named,b.named)},
iZ:function(a){var z=$.bF
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
iW:function(a){return H.U(a)},
iV:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
hu:function(a){var z,y,x,w,v,u
z=$.bF.$1(a)
y=$.b5[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.b8[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.cX.$2(a,z)
if(z!=null){y=$.b5[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.b8[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bI(x)
$.b5[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.b8[z]=x
return x}if(v==="-"){u=H.bI(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.d8(a,x)
if(v==="*")throw H.e(new P.cI(z))
if(init.leafTags[z]===true){u=H.bI(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.d8(a,x)},
d8:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.b9(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bI:function(a){return J.b9(a,!1,null,!!a.$isE)},
hz:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.b9(z,!1,null,!!z.$isE)
else return J.b9(z,c,null,null)},
hk:function(){if(!0===$.bG)return
$.bG=!0
H.hl()},
hl:function(){var z,y,x,w,v,u,t,s
$.b5=Object.create(null)
$.b8=Object.create(null)
H.hg()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.da.$1(v)
if(u!=null){t=H.hz(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
hg:function(){var z,y,x,w,v,u,t
z=C.v()
z=H.a2(C.r,H.a2(C.x,H.a2(C.l,H.a2(C.l,H.a2(C.w,H.a2(C.t,H.a2(C.u(C.m),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bF=new H.hh(v)
$.cX=new H.hi(u)
$.da=new H.hj(t)},
a2:function(a,b){return a(b)||b},
hG:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
hH:function(a,b,c){var z,y,x
if(b==="")if(a==="")return c
else{z=a.length
for(y=c,x=0;x<z;++x)y=y+a[x]+c
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
er:{"^":"a;a,b,c,d,e,f,r,x",k:{
es:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.er(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
eH:{"^":"a;a,b,c,d,e,f",
C:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
k:{
N:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.eH(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
aX:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
cD:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
ck:{"^":"v;a,b",
h:function(a){var z=this.b
if(z==null)return"NullError: "+H.d(this.a)
return"NullError: method not found: '"+H.d(z)+"' on null"}},
e7:{"^":"v;a,b,c",
h:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.d(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.d(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.d(this.a)+")"},
k:{
bk:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.e7(a,y,z?null:b.receiver)}}},
eI:{"^":"v;a",
h:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
hJ:{"^":"c:0;a",
$1:function(a){if(!!J.m(a).$isv)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
cR:{"^":"a;a,b",
h:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
ho:{"^":"c:1;a",
$0:function(){return this.a.$0()}},
hp:{"^":"c:1;a,b",
$0:function(){return this.a.$1(this.b)}},
hq:{"^":"c:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
hr:{"^":"c:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
hs:{"^":"c:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
c:{"^":"a;",
h:function(a){return"Closure '"+H.br(this).trim()+"'"},
gbu:function(){return this},
gbu:function(){return this}},
cv:{"^":"c;"},
ew:{"^":"cv;",
h:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
be:{"^":"cv;a,b,c,d",
n:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.be))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gp:function(a){var z,y
z=this.c
if(z==null)y=H.U(this.a)
else y=typeof z!=="object"?J.P(z):H.U(z)
z=H.U(this.b)
if(typeof y!=="number")return y.cX()
return(y^z)>>>0},
h:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.d(this.d)+"' of "+H.aU(z)},
k:{
bf:function(a){return a.a},
bR:function(a){return a.c},
dn:function(){var z=$.ab
if(z==null){z=H.aK("self")
$.ab=z}return z},
aK:function(a){var z,y,x,w,v
z=new H.be("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
dp:{"^":"v;a",
h:function(a){return this.a},
k:{
dq:function(a,b){return new H.dp("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
et:{"^":"v;a",
h:function(a){return"RuntimeError: "+H.d(this.a)}},
X:{"^":"a;a,b,c,d,e,f,r,$ti",
gj:function(a){return this.a},
gE:function(a){return this.a===0},
gbh:function(){return new H.e9(this,[H.a6(this,0)])},
gbs:function(a){return H.aS(this.gbh(),new H.e6(this),H.a6(this,0),H.a6(this,1))},
bd:function(a){var z
if((a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.bZ(z,a)}else return this.cD(a)},
cD:function(a){var z=this.d
if(z==null)return!1
return this.V(this.a5(z,this.U(a)),a)>=0},
i:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.R(z,b)
return y==null?null:y.gL()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.R(x,b)
return y==null?null:y.gL()}else return this.cE(b)},
cE:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.a5(z,this.U(a))
x=this.V(y,a)
if(x<0)return
return y[x].gL()},
t:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.as()
this.b=z}this.aJ(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.as()
this.c=y}this.aJ(y,b,c)}else{x=this.d
if(x==null){x=this.as()
this.d=x}w=this.U(b)
v=this.a5(x,w)
if(v==null)this.aw(x,w,[this.at(b,c)])
else{u=this.V(v,b)
if(u>=0)v[u].sL(c)
else v.push(this.at(b,c))}}},
Y:function(a,b){if(typeof b==="string")return this.b1(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.b1(this.c,b)
else return this.cF(b)},
cF:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.a5(z,this.U(a))
x=this.V(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.b7(w)
return w.gL()},
O:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
cs:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.e(new P.ac(this))
z=z.c}},
aJ:function(a,b,c){var z=this.R(a,b)
if(z==null)this.aw(a,b,this.at(b,c))
else z.sL(c)},
b1:function(a,b){var z
if(a==null)return
z=this.R(a,b)
if(z==null)return
this.b7(z)
this.aP(a,b)
return z.gL()},
at:function(a,b){var z,y
z=new H.e8(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
b7:function(a){var z,y
z=a.gc7()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
U:function(a){return J.P(a)&0x3ffffff},
V:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.V(a[y].gbg(),b))return y
return-1},
h:function(a){return P.ee(this)},
R:function(a,b){return a[b]},
a5:function(a,b){return a[b]},
aw:function(a,b,c){a[b]=c},
aP:function(a,b){delete a[b]},
bZ:function(a,b){return this.R(a,b)!=null},
as:function(){var z=Object.create(null)
this.aw(z,"<non-identifier-key>",z)
this.aP(z,"<non-identifier-key>")
return z},
$isdS:1},
e6:{"^":"c:0;a",
$1:function(a){return this.a.i(0,a)}},
e8:{"^":"a;bg:a<,L:b@,c,c7:d<"},
e9:{"^":"h;a,$ti",
gj:function(a){return this.a.a},
gu:function(a){var z,y
z=this.a
y=new H.ea(z,z.r,null,null)
y.c=z.e
return y}},
ea:{"^":"a;a,b,c,d",
gm:function(){return this.d},
l:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.ac(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
hh:{"^":"c:0;a",
$1:function(a){return this.a(a)}},
hi:{"^":"c:6;a",
$2:function(a,b){return this.a(a,b)}},
hj:{"^":"c:7;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
hb:function(a){var z=H.t(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
hB:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",cf:{"^":"f;",$iscf:1,"%":"ArrayBuffer"},bp:{"^":"f;",$isbp:1,"%":"DataView;ArrayBufferView;bn|cg|ci|bo|ch|cj|T"},bn:{"^":"bp;",
gj:function(a){return a.length},
$isE:1,
$asE:I.w,
$isy:1,
$asy:I.w},bo:{"^":"ci;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.q(H.p(a,b))
return a[b]},
t:function(a,b,c){if(b>>>0!==b||b>=a.length)H.q(H.p(a,b))
a[b]=c}},cg:{"^":"bn+S;",$asE:I.w,$asy:I.w,
$asi:function(){return[P.G]},
$ash:function(){return[P.G]},
$isi:1,
$ish:1},ci:{"^":"cg+c4;",$asE:I.w,$asy:I.w,
$asi:function(){return[P.G]},
$ash:function(){return[P.G]}},T:{"^":"cj;",
t:function(a,b,c){if(b>>>0!==b||b>=a.length)H.q(H.p(a,b))
a[b]=c},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]}},ch:{"^":"bn+S;",$asE:I.w,$asy:I.w,
$asi:function(){return[P.j]},
$ash:function(){return[P.j]},
$isi:1,
$ish:1},cj:{"^":"ch+c4;",$asE:I.w,$asy:I.w,
$asi:function(){return[P.j]},
$ash:function(){return[P.j]}},il:{"^":"bo;",$isi:1,
$asi:function(){return[P.G]},
$ish:1,
$ash:function(){return[P.G]},
"%":"Float32Array"},im:{"^":"bo;",$isi:1,
$asi:function(){return[P.G]},
$ish:1,
$ash:function(){return[P.G]},
"%":"Float64Array"},io:{"^":"T;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.q(H.p(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Int16Array"},ip:{"^":"T;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.q(H.p(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Int32Array"},iq:{"^":"T;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.q(H.p(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Int8Array"},ir:{"^":"T;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.q(H.p(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Uint16Array"},is:{"^":"T;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.q(H.p(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Uint32Array"},it:{"^":"T;",
gj:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)H.q(H.p(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"CanvasPixelArray|Uint8ClampedArray"},iu:{"^":"T;",
gj:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)H.q(H.p(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
eN:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.fN()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ap(new P.eP(z),1)).observe(y,{childList:true})
return new P.eO(z,y,x)}else if(self.setImmediate!=null)return P.fO()
return P.fP()},
iG:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ap(new P.eQ(a),0))},"$1","fN",2,0,3],
iH:[function(a){++init.globalState.f.b
self.setImmediate(H.ap(new P.eR(a),0))},"$1","fO",2,0,3],
iI:[function(a){P.bu(C.k,a)},"$1","fP",2,0,3],
cS:function(a,b){if(H.a4(a,{func:1,args:[P.aT,P.aT]})){b.toString
return a}else{b.toString
return a}},
fE:function(){var z,y
for(;z=$.a1,z!=null;){$.am=null
y=z.b
$.a1=y
if(y==null)$.al=null
z.a.$0()}},
iU:[function(){$.bA=!0
try{P.fE()}finally{$.am=null
$.bA=!1
if($.a1!=null)$.$get$bv().$1(P.d_())}},"$0","d_",0,0,2],
cW:function(a){var z=new P.cJ(a,null)
if($.a1==null){$.al=z
$.a1=z
if(!$.bA)$.$get$bv().$1(P.d_())}else{$.al.b=z
$.al=z}},
fH:function(a){var z,y,x
z=$.a1
if(z==null){P.cW(a)
$.am=$.al
return}y=new P.cJ(a,null)
x=$.am
if(x==null){y.b=z
$.am=y
$.a1=y}else{y.b=x.b
x.b=y
$.am=y
if(y.b==null)$.al=y}},
db:function(a){var z=$.l
if(C.b===z){P.b2(null,null,C.b,a)
return}z.toString
P.b2(null,null,z,z.az(a,!0))},
iS:[function(a){},"$1","fQ",2,0,12],
fF:[function(a,b){var z=$.l
z.toString
P.an(null,null,z,a,b)},function(a){return P.fF(a,null)},"$2","$1","fS",2,2,4,0],
iT:[function(){},"$0","fR",0,0,2],
fA:function(a,b,c){$.l.toString
a.ae(b,c)},
cw:function(a,b){var z=$.l
if(z===C.b){z.toString
return P.bu(a,b)}return P.bu(a,z.az(b,!0))},
bu:function(a,b){var z=C.e.I(a.a,1000)
return H.eE(z<0?0:z,b)},
eM:function(){return $.l},
an:function(a,b,c,d,e){var z={}
z.a=d
P.fH(new P.fG(z,e))},
cT:function(a,b,c,d){var z,y
y=$.l
if(y===c)return d.$0()
$.l=c
z=y
try{y=d.$0()
return y}finally{$.l=z}},
cV:function(a,b,c,d,e){var z,y
y=$.l
if(y===c)return d.$1(e)
$.l=c
z=y
try{y=d.$1(e)
return y}finally{$.l=z}},
cU:function(a,b,c,d,e,f){var z,y
y=$.l
if(y===c)return d.$2(e,f)
$.l=c
z=y
try{y=d.$2(e,f)
return y}finally{$.l=z}},
b2:function(a,b,c,d){var z=C.b!==c
if(z)d=c.az(d,!(!z||!1))
P.cW(d)},
eP:{"^":"c:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
eO:{"^":"c:8;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
eQ:{"^":"c:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
eR:{"^":"c:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
cO:{"^":"a;au:a<,b,c,d,e",
gcd:function(){return this.b.b},
gbf:function(){return(this.c&1)!==0},
gcB:function(){return(this.c&2)!==0},
gbe:function(){return this.c===8},
cz:function(a){return this.b.b.aE(this.d,a)},
cJ:function(a){if(this.c!==6)return!0
return this.b.b.aE(this.d,J.aq(a))},
ct:function(a){var z,y,x
z=this.e
y=J.a5(a)
x=this.b.b
if(H.a4(z,{func:1,args:[,,]}))return x.cP(z,y.gK(a),a.gN())
else return x.aE(z,y.gK(a))},
cA:function(){return this.b.b.bn(this.d)}},
a_:{"^":"a;a8:a<,b,cb:c<,$ti",
gc5:function(){return this.a===2},
gar:function(){return this.a>=4},
bq:function(a,b){var z,y
z=$.l
if(z!==C.b){z.toString
if(b!=null)b=P.cS(b,z)}y=new P.a_(0,z,null,[null])
this.af(new P.cO(null,y,b==null?1:3,a,b))
return y},
cR:function(a){return this.bq(a,null)},
bt:function(a){var z,y
z=$.l
y=new P.a_(0,z,null,this.$ti)
if(z!==C.b)z.toString
this.af(new P.cO(null,y,8,a,null))
return y},
af:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gar()){y.af(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.b2(null,null,z,new P.f7(this,a))}},
b0:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gau()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gar()){v.b0(a)
return}this.a=v.a
this.c=v.c}z.a=this.a7(a)
y=this.b
y.toString
P.b2(null,null,y,new P.fc(z,this))}},
av:function(){var z=this.c
this.c=null
return this.a7(z)},
a7:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gau()
z.a=y}return y},
am:function(a){var z,y
z=this.$ti
if(H.d0(a,"$isad",z,"$asad"))if(H.d0(a,"$isa_",z,null))P.cP(a,this)
else P.f8(a,this)
else{y=this.av()
this.a=4
this.c=a
P.aj(this,y)}},
an:[function(a,b){var z=this.av()
this.a=8
this.c=new P.aJ(a,b)
P.aj(this,z)},function(a){return this.an(a,null)},"cY","$2","$1","gaO",2,2,4,0],
bR:function(a,b){this.a=4
this.c=a},
$isad:1,
k:{
f8:function(a,b){var z,y,x
b.a=1
try{a.bq(new P.f9(b),new P.fa(b))}catch(x){z=H.J(x)
y=H.I(x)
P.db(new P.fb(b,z,y))}},
cP:function(a,b){var z,y,x
for(;a.gc5();)a=a.c
z=a.gar()
y=b.c
if(z){b.c=null
x=b.a7(y)
b.a=a.a
b.c=a.c
P.aj(b,x)}else{b.a=2
b.c=a
a.b0(y)}},
aj:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=J.aq(v)
t=v.gN()
y.toString
P.an(null,null,y,u,t)}return}for(;b.gau()!=null;b=s){s=b.a
b.a=null
P.aj(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gbf()||b.gbe()){q=b.gcd()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=J.aq(v)
t=v.gN()
y.toString
P.an(null,null,y,u,t)
return}p=$.l
if(p==null?q!=null:p!==q)$.l=q
else p=null
if(b.gbe())new P.ff(z,x,w,b).$0()
else if(y){if(b.gbf())new P.fe(x,b,r).$0()}else if(b.gcB())new P.fd(z,x,b).$0()
if(p!=null)$.l=p
y=x.b
if(!!J.m(y).$isad){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.a7(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.cP(y,o)
return}}o=b.b
b=o.av()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
f7:{"^":"c:1;a,b",
$0:function(){P.aj(this.a,this.b)}},
fc:{"^":"c:1;a,b",
$0:function(){P.aj(this.b,this.a.a)}},
f9:{"^":"c:0;a",
$1:function(a){var z=this.a
z.a=0
z.am(a)}},
fa:{"^":"c:9;a",
$2:function(a,b){this.a.an(a,b)},
$1:function(a){return this.$2(a,null)}},
fb:{"^":"c:1;a,b,c",
$0:function(){this.a.an(this.b,this.c)}},
ff:{"^":"c:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.cA()}catch(w){y=H.J(w)
x=H.I(w)
if(this.c){v=J.aq(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.aJ(y,x)
u.a=!0
return}if(!!J.m(z).$isad){if(z instanceof P.a_&&z.ga8()>=4){if(z.ga8()===8){v=this.b
v.b=z.gcb()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.cR(new P.fg(t))
v.a=!1}}},
fg:{"^":"c:0;a",
$1:function(a){return this.a}},
fe:{"^":"c:2;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.cz(this.c)}catch(x){z=H.J(x)
y=H.I(x)
w=this.a
w.b=new P.aJ(z,y)
w.a=!0}}},
fd:{"^":"c:2;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.cJ(z)===!0&&w.e!=null){v=this.b
v.b=w.ct(z)
v.a=!1}}catch(u){y=H.J(u)
x=H.I(u)
w=this.a
v=J.aq(w.a.c)
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.aJ(y,x)
s.a=!0}}},
cJ:{"^":"a;a,b"},
ai:{"^":"a;$ti",
M:function(a,b){return new P.fq(b,this,[H.r(this,"ai",0),null])},
gj:function(a){var z,y
z={}
y=new P.a_(0,$.l,null,[P.j])
z.a=0
this.W(new P.ey(z),!0,new P.ez(z,y),y.gaO())
return y},
a_:function(a){var z,y,x
z=H.r(this,"ai",0)
y=H.t([],[z])
x=new P.a_(0,$.l,null,[[P.i,z]])
this.W(new P.eA(this,y),!0,new P.eB(y,x),x.gaO())
return x}},
ey:{"^":"c:0;a",
$1:function(a){++this.a.a}},
ez:{"^":"c:1;a,b",
$0:function(){this.b.am(this.a.a)}},
eA:{"^":"c;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.d1(function(a){return{func:1,args:[a]}},this.a,"ai")}},
eB:{"^":"c:1;a,b",
$0:function(){this.b.am(this.a)}},
ex:{"^":"a;"},
aZ:{"^":"a;a8:e<,$ti",
aC:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.ba()
if((z&4)===0&&(this.e&32)===0)this.aS(this.gaX())},
bk:function(a){return this.aC(a,null)},
bm:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gE(z)}else z=!1
if(z)this.r.ac(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.aS(this.gaZ())}}}},
a9:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.ai()
z=this.f
return z==null?$.$get$aN():z},
ai:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.ba()
if((this.e&32)===0)this.r=null
this.f=this.aW()},
ah:["bK",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.b3(a)
else this.ag(new P.eX(a,null,[H.r(this,"aZ",0)]))}],
ae:["bL",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.b5(a,b)
else this.ag(new P.eZ(a,b,null))}],
bU:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.b4()
else this.ag(C.p)},
aY:[function(){},"$0","gaX",0,0,2],
b_:[function(){},"$0","gaZ",0,0,2],
aW:function(){return},
ag:function(a){var z,y
z=this.r
if(z==null){z=new P.fy(null,null,0,[H.r(this,"aZ",0)])
this.r=z}z.B(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.ac(this)}},
b3:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.aF(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aj((z&4)!==0)},
b5:function(a,b){var z,y
z=this.e
y=new P.eT(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.ai()
z=this.f
if(!!J.m(z).$isad&&z!==$.$get$aN())z.bt(y)
else y.$0()}else{y.$0()
this.aj((z&4)!==0)}},
b4:function(){var z,y
z=new P.eS(this)
this.ai()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.m(y).$isad&&y!==$.$get$aN())y.bt(z)
else z.$0()},
aS:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aj((z&4)!==0)},
aj:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gE(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gE(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.aY()
else this.b_()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.ac(this)},
bO:function(a,b,c,d,e){var z,y
z=a==null?P.fQ():a
y=this.d
y.toString
this.a=z
this.b=P.cS(b==null?P.fS():b,y)
this.c=c==null?P.fR():c}},
eT:{"^":"c:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.a4(y,{func:1,args:[P.a,P.ay]})
w=z.d
v=this.b
u=z.b
if(x)w.cQ(u,v,this.c)
else w.aF(u,v)
z.e=(z.e&4294967263)>>>0}},
eS:{"^":"c:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.bo(z.c)
z.e=(z.e&4294967263)>>>0}},
cM:{"^":"a;aa:a@"},
eX:{"^":"cM;b,a,$ti",
aD:function(a){a.b3(this.b)}},
eZ:{"^":"cM;K:b>,N:c<,a",
aD:function(a){a.b5(this.b,this.c)}},
eY:{"^":"a;",
aD:function(a){a.b4()},
gaa:function(){return},
saa:function(a){throw H.e(new P.bs("No events after a done."))}},
fs:{"^":"a;a8:a<",
ac:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.db(new P.ft(this,a))
this.a=1},
ba:function(){if(this.a===1)this.a=3}},
ft:{"^":"c:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gaa()
z.b=w
if(w==null)z.c=null
x.aD(this.b)}},
fy:{"^":"fs;b,c,a,$ti",
gE:function(a){return this.c==null},
B:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saa(b)
this.c=b}}},
bw:{"^":"ai;$ti",
W:function(a,b,c,d){return this.c_(a,d,c,!0===b)},
bi:function(a,b,c){return this.W(a,null,b,c)},
c_:function(a,b,c,d){return P.f6(this,a,b,c,d,H.r(this,"bw",0),H.r(this,"bw",1))},
aT:function(a,b){b.ah(a)},
c4:function(a,b,c){c.ae(a,b)},
$asai:function(a,b){return[b]}},
cN:{"^":"aZ;x,y,a,b,c,d,e,f,r,$ti",
ah:function(a){if((this.e&2)!==0)return
this.bK(a)},
ae:function(a,b){if((this.e&2)!==0)return
this.bL(a,b)},
aY:[function(){var z=this.y
if(z==null)return
z.bk(0)},"$0","gaX",0,0,2],
b_:[function(){var z=this.y
if(z==null)return
z.bm()},"$0","gaZ",0,0,2],
aW:function(){var z=this.y
if(z!=null){this.y=null
return z.a9()}return},
cZ:[function(a){this.x.aT(a,this)},"$1","gc1",2,0,function(){return H.d1(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"cN")}],
d0:[function(a,b){this.x.c4(a,b,this)},"$2","gc3",4,0,10],
d_:[function(){this.bU()},"$0","gc2",0,0,2],
bQ:function(a,b,c,d,e,f,g){this.y=this.x.a.bi(this.gc1(),this.gc2(),this.gc3())},
$asaZ:function(a,b){return[b]},
k:{
f6:function(a,b,c,d,e,f,g){var z,y
z=$.l
y=e?1:0
y=new P.cN(a,null,null,null,null,z,y,null,null,[f,g])
y.bO(b,c,d,e,g)
y.bQ(a,b,c,d,e,f,g)
return y}}},
fq:{"^":"bw;b,a,$ti",
aT:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.J(w)
x=H.I(w)
P.fA(b,y,x)
return}b.ah(z)}},
aJ:{"^":"a;K:a>,N:b<",
h:function(a){return H.d(this.a)},
$isv:1},
fz:{"^":"a;"},
fG:{"^":"c:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cl()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.e(z)
x=H.e(z)
x.stack=J.Q(y)
throw x}},
fu:{"^":"fz;",
bo:function(a){var z,y,x,w
try{if(C.b===$.l){x=a.$0()
return x}x=P.cT(null,null,this,a)
return x}catch(w){z=H.J(w)
y=H.I(w)
x=P.an(null,null,this,z,y)
return x}},
aF:function(a,b){var z,y,x,w
try{if(C.b===$.l){x=a.$1(b)
return x}x=P.cV(null,null,this,a,b)
return x}catch(w){z=H.J(w)
y=H.I(w)
x=P.an(null,null,this,z,y)
return x}},
cQ:function(a,b,c){var z,y,x,w
try{if(C.b===$.l){x=a.$2(b,c)
return x}x=P.cU(null,null,this,a,b,c)
return x}catch(w){z=H.J(w)
y=H.I(w)
x=P.an(null,null,this,z,y)
return x}},
az:function(a,b){if(b)return new P.fv(this,a)
else return new P.fw(this,a)},
cg:function(a,b){return new P.fx(this,a)},
i:function(a,b){return},
bn:function(a){if($.l===C.b)return a.$0()
return P.cT(null,null,this,a)},
aE:function(a,b){if($.l===C.b)return a.$1(b)
return P.cV(null,null,this,a,b)},
cP:function(a,b,c){if($.l===C.b)return a.$2(b,c)
return P.cU(null,null,this,a,b,c)}},
fv:{"^":"c:1;a,b",
$0:function(){return this.a.bo(this.b)}},
fw:{"^":"c:1;a,b",
$0:function(){return this.a.bn(this.b)}},
fx:{"^":"c:0;a,b",
$1:function(a){return this.a.aF(this.b,a)}}}],["","",,P,{"^":"",
eb:function(){return new H.X(0,null,null,null,null,null,0,[null,null])},
af:function(a){return H.hc(a,new H.X(0,null,null,null,null,null,0,[null,null]))},
e_:function(a,b,c){var z,y
if(P.bB(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$ao()
y.push(a)
try{P.fD(a,z)}finally{if(0>=y.length)return H.b(y,-1)
y.pop()}y=P.cu(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aO:function(a,b,c){var z,y,x
if(P.bB(a))return b+"..."+c
z=new P.bt(b)
y=$.$get$ao()
y.push(a)
try{x=z
x.q=P.cu(x.gq(),a,", ")}finally{if(0>=y.length)return H.b(y,-1)
y.pop()}y=z
y.q=y.gq()+c
y=z.gq()
return y.charCodeAt(0)==0?y:y},
bB:function(a){var z,y
for(z=0;y=$.$get$ao(),z<y.length;++z)if(a===y[z])return!0
return!1},
fD:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gu(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.l())return
w=H.d(z.gm())
b.push(w)
y+=w.length+2;++x}if(!z.l()){if(x<=5)return
if(0>=b.length)return H.b(b,-1)
v=b.pop()
if(0>=b.length)return H.b(b,-1)
u=b.pop()}else{t=z.gm();++x
if(!z.l()){if(x<=4){b.push(H.d(t))
return}v=H.d(t)
if(0>=b.length)return H.b(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gm();++x
for(;z.l();t=s,s=r){r=z.gm();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.b(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.d(t)
v=H.d(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.b(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
ag:function(a,b,c,d){return new P.fj(0,null,null,null,null,null,0,[d])},
ee:function(a){var z,y,x
z={}
if(P.bB(a))return"{...}"
y=new P.bt("")
try{$.$get$ao().push(a)
x=y
x.q=x.gq()+"{"
z.a=!0
a.cs(0,new P.ef(z,y))
z=y
z.q=z.gq()+"}"}finally{z=$.$get$ao()
if(0>=z.length)return H.b(z,-1)
z.pop()}z=y.gq()
return z.charCodeAt(0)==0?z:z},
cQ:{"^":"X;a,b,c,d,e,f,r,$ti",
U:function(a){return H.hA(a)&0x3ffffff},
V:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gbg()
if(x==null?b==null:x===b)return y}return-1},
k:{
ak:function(a,b){return new P.cQ(0,null,null,null,null,null,0,[a,b])}}},
fj:{"^":"fh;a,b,c,d,e,f,r,$ti",
gu:function(a){var z=new P.by(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
cj:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.bY(b)},
bY:function(a){var z=this.d
if(z==null)return!1
return this.a4(z[this.a3(a)],a)>=0},
bj:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.cj(0,a)?a:null
else return this.c6(a)},
c6:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.a3(a)]
x=this.a4(y,a)
if(x<0)return
return J.bL(y,x).gaQ()},
B:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.aL(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.aL(x,b)}else return this.D(b)},
D:function(a){var z,y,x
z=this.d
if(z==null){z=P.fl()
this.d=z}y=this.a3(a)
x=z[y]
if(x==null)z[y]=[this.al(a)]
else{if(this.a4(x,a)>=0)return!1
x.push(this.al(a))}return!0},
Y:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.aM(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.aM(this.c,b)
else return this.c8(b)},
c8:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.a3(a)]
x=this.a4(y,a)
if(x<0)return!1
this.aN(y.splice(x,1)[0])
return!0},
O:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
aL:function(a,b){if(a[b]!=null)return!1
a[b]=this.al(b)
return!0},
aM:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.aN(z)
delete a[b]
return!0},
al:function(a){var z,y
z=new P.fk(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
aN:function(a){var z,y
z=a.gbX()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
a3:function(a){return J.P(a)&0x3ffffff},
a4:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.V(a[y].gaQ(),b))return y
return-1},
$ish:1,
$ash:null,
k:{
fl:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
fk:{"^":"a;aQ:a<,b,bX:c<"},
by:{"^":"a;a,b,c,d",
gm:function(){return this.d},
l:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.ac(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
fh:{"^":"eu;$ti"},
ah:{"^":"eg;$ti"},
eg:{"^":"a+S;",$asi:null,$ash:null,$isi:1,$ish:1},
S:{"^":"a;$ti",
gu:function(a){return new H.ce(a,this.gj(a),0,null)},
v:function(a,b){return this.i(a,b)},
M:function(a,b){return new H.bm(a,b,[H.r(a,"S",0),null])},
a0:function(a,b){var z,y,x
z=H.t([],[H.r(a,"S",0)])
C.d.sj(z,this.gj(a))
for(y=0;y<this.gj(a);++y){x=this.i(a,y)
if(y>=z.length)return H.b(z,y)
z[y]=x}return z},
a_:function(a){return this.a0(a,!0)},
h:function(a){return P.aO(a,"[","]")},
$isi:1,
$asi:null,
$ish:1,
$ash:null},
ef:{"^":"c:11;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.q+=", "
z.a=!1
z=this.b
y=z.q+=H.d(a)
z.q=y+": "
z.q+=H.d(b)}},
ec:{"^":"ax;a,b,c,d,$ti",
gu:function(a){return new P.fm(this,this.c,this.d,this.b,null)},
gE:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
v:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(typeof b!=="number")return H.O(b)
if(0>b||b>=z)H.q(P.ae(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.b(y,w)
return y[w]},
O:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.b(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
h:function(a){return P.aO(this,"{","}")},
bl:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.e(H.c9());++this.d
y=this.a
x=y.length
if(z>=x)return H.b(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
D:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.b(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.aR();++this.d},
aR:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.t(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.d.aH(y,0,w,z,x)
C.d.aH(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
bM:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.t(z,[b])},
$ash:null,
k:{
bl:function(a,b){var z=new P.ec(null,0,0,0,[b])
z.bM(a,b)
return z}}},
fm:{"^":"a;a,b,c,d,e",
gm:function(){return this.e},
l:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.q(new P.ac(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.b(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
ev:{"^":"a;$ti",
M:function(a,b){return new H.c1(this,b,[H.a6(this,0),null])},
h:function(a){return P.aO(this,"{","}")},
v:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(P.bO("index"))
if(b<0)H.q(P.Y(b,0,null,"index",null))
for(z=new P.by(this,this.r,null,null),z.c=this.e,y=0;z.l();){x=z.d
if(b===y)return x;++y}throw H.e(P.ae(b,this,"index",null,y))},
$ish:1,
$ash:null},
eu:{"^":"ev;$ti"}}],["","",,P,{"^":"",
c2:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.Q(a)
if(typeof a==="string")return JSON.stringify(a)
return P.dF(a)},
dF:function(a){var z=J.m(a)
if(!!z.$isc)return z.h(a)
return H.aU(a)},
aM:function(a){return new P.f5(a)},
aQ:function(a,b,c){var z,y
z=H.t([],[c])
for(y=J.aI(a);y.l();)z.push(y.gm())
if(b)return z
z.fixed$length=Array
return z},
bJ:function(a){H.hB(H.d(a))},
fT:{"^":"a;",
gp:function(a){return P.a.prototype.gp.call(this,this)},
h:function(a){return this?"true":"false"}},
"+bool":0,
bg:{"^":"a;a,b",
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.bg))return!1
return this.a===b.a&&this.b===b.b},
gp:function(a){var z=this.a
return(z^C.e.ax(z,30))&1073741823},
h:function(a){var z,y,x,w,v,u,t
z=P.dA(H.eo(this))
y=P.ar(H.em(this))
x=P.ar(H.ei(this))
w=P.ar(H.ej(this))
v=P.ar(H.el(this))
u=P.ar(H.en(this))
t=P.dB(H.ek(this))
if(this.b)return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t+"Z"
else return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t},
k:{
dz:function(){return new P.bg(Date.now(),!1)},
dA:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.d(z)
if(z>=10)return y+"00"+H.d(z)
return y+"000"+H.d(z)},
dB:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
ar:function(a){if(a>=10)return""+a
return"0"+a}}},
G:{"^":"aE;"},
"+double":0,
as:{"^":"a;a",
a2:function(a,b){return new P.as(C.e.a2(this.a,b.gc0()))},
ab:function(a,b){return C.e.ab(this.a,b.gc0())},
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.as))return!1
return this.a===b.a},
gp:function(a){return this.a&0x1FFFFFFF},
h:function(a){var z,y,x,w,v
z=new P.dE()
y=this.a
if(y<0)return"-"+new P.as(0-y).h(0)
x=z.$1(C.e.I(y,6e7)%60)
w=z.$1(C.e.I(y,1e6)%60)
v=new P.dD().$1(y%1e6)
return""+C.e.I(y,36e8)+":"+H.d(x)+":"+H.d(w)+"."+H.d(v)},
k:{
c0:function(a,b,c,d,e,f){return new P.as(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
dD:{"^":"c:5;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
dE:{"^":"c:5;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
v:{"^":"a;",
gN:function(){return H.I(this.$thrownJsError)}},
cl:{"^":"v;",
h:function(a){return"Throw of null."}},
R:{"^":"v;a,b,c,d",
gap:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gao:function(){return""},
h:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.d(z)
w=this.gap()+y+x
if(!this.a)return w
v=this.gao()
u=P.c2(this.b)
return w+v+": "+H.d(u)},
k:{
bN:function(a){return new P.R(!1,null,null,a)},
bP:function(a,b,c){return new P.R(!0,a,b,c)},
bO:function(a){return new P.R(!1,null,a,"Must not be null")}}},
cq:{"^":"R;e,f,a,b,c,d",
gap:function(){return"RangeError"},
gao:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.d(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.d(z)
else if(x>z)y=": Not in range "+H.d(z)+".."+H.d(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.d(z)}return y},
k:{
aV:function(a,b,c){return new P.cq(null,null,!0,a,b,"Value not in range")},
Y:function(a,b,c,d,e){return new P.cq(b,c,!0,a,d,"Invalid value")},
cr:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.Y(a,0,c,"start",f))
if(a>b||b>c)throw H.e(P.Y(b,a,c,"end",f))
return b}}},
dM:{"^":"R;e,j:f>,a,b,c,d",
gap:function(){return"RangeError"},
gao:function(){if(J.dg(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.d(z)},
k:{
ae:function(a,b,c,d,e){var z=e!=null?e:J.aa(b)
return new P.dM(b,z,!0,a,c,"Index out of range")}}},
A:{"^":"v;a",
h:function(a){return"Unsupported operation: "+this.a}},
cI:{"^":"v;a",
h:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.d(z):"UnimplementedError"}},
bs:{"^":"v;a",
h:function(a){return"Bad state: "+this.a}},
ac:{"^":"v;a",
h:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.d(P.c2(z))+"."}},
ct:{"^":"a;",
h:function(a){return"Stack Overflow"},
gN:function(){return},
$isv:1},
dy:{"^":"v;a",
h:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.d(z)+"' during its initialization"}},
f5:{"^":"a;a",
h:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.d(z)}},
dK:{"^":"a;a,b,c",
h:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(x.length>78)x=C.h.ad(x,0,75)+"..."
return y+"\n"+x}},
dG:{"^":"a;a,aV",
h:function(a){return"Expando:"+H.d(this.a)},
i:function(a,b){var z,y
z=this.aV
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.q(P.bP(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.bq(b,"expando$values")
return y==null?null:H.bq(y,z)},
t:function(a,b,c){var z,y
z=this.aV
if(typeof z!=="string")z.set(b,c)
else{y=H.bq(b,"expando$values")
if(y==null){y=new P.a()
H.cp(b,"expando$values",y)}H.cp(y,z,c)}}},
j:{"^":"aE;"},
"+int":0,
K:{"^":"a;$ti",
M:function(a,b){return H.aS(this,b,H.r(this,"K",0),null)},
a0:function(a,b){return P.aQ(this,!0,H.r(this,"K",0))},
a_:function(a){return this.a0(a,!0)},
gj:function(a){var z,y
z=this.gu(this)
for(y=0;z.l();)++y
return y},
v:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(P.bO("index"))
if(b<0)H.q(P.Y(b,0,null,"index",null))
for(z=this.gu(this),y=0;z.l();){x=z.gm()
if(b===y)return x;++y}throw H.e(P.ae(b,this,"index",null,y))},
h:function(a){return P.e_(this,"(",")")}},
ca:{"^":"a;"},
i:{"^":"a;$ti",$asi:null,$ish:1,$ash:null},
"+List":0,
aT:{"^":"a;",
gp:function(a){return P.a.prototype.gp.call(this,this)},
h:function(a){return"null"}},
"+Null":0,
aE:{"^":"a;"},
"+num":0,
a:{"^":";",
n:function(a,b){return this===b},
gp:function(a){return H.U(this)},
h:function(a){return H.aU(this)},
toString:function(){return this.h(this)}},
ay:{"^":"a;"},
Z:{"^":"a;"},
"+String":0,
bt:{"^":"a;q<",
gj:function(a){return this.q.length},
h:function(a){var z=this.q
return z.charCodeAt(0)==0?z:z},
k:{
cu:function(a,b,c){var z=J.aI(b)
if(!z.l())return a
if(c.length===0){do a+=H.d(z.gm())
while(z.l())}else{a+=H.d(z.gm())
for(;z.l();)a=a+c+H.d(z.gm())}return a}}}}],["","",,W,{"^":"",
bM:function(a){var z=document.createElement("a")
return z},
dx:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(b,c){return c.toUpperCase()})},
f_:function(a,b){return document.createElement(a)},
x:function(a,b,c){var z=document.createElement("img")
return z},
b0:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
fI:function(a){var z=$.l
if(z===C.b)return a
return z.cg(a,!0)},
M:{"^":"B;","%":"HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
hL:{"^":"M;",
h:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
hN:{"^":"M;",
h:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
dm:{"^":"M;",$isf:1,"%":"HTMLBodyElement"},
bS:{"^":"M;",$isa:1,"%":"HTMLCanvasElement"},
hO:{"^":"n;j:length=",$isf:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
dv:{"^":"dN;j:length=",
G:function(a,b){var z,y
z=$.$get$bU()
y=z[b]
if(typeof y==="string")return y
y=W.dx(b) in a?b:P.dC()+b
z[b]=y
return y},
H:function(a,b,c,d){a.setProperty(b,c,d)},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
dN:{"^":"f+dw;"},
dw:{"^":"a;"},
hP:{"^":"n;",$isf:1,"%":"DocumentFragment|ShadowRoot"},
hQ:{"^":"f;",
h:function(a){return String(a)},
"%":"DOMException"},
cL:{"^":"ah;a,b",
gj:function(a){return this.b.length},
i:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.b(z,b)
return z[b]},
t:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.b(z,b)
this.a.replaceChild(c,z[b])},
B:function(a,b){this.a.appendChild(b)
return b},
gu:function(a){var z=this.a_(this)
return new J.bd(z,z.length,0,null)},
ce:function(a,b){var z,y,x
for(z=b.length,y=this.a,x=0;x<b.length;b.length===z||(0,H.dd)(b),++x)y.appendChild(b[x])},
$asah:function(){return[W.B]},
$asi:function(){return[W.B]},
$ash:function(){return[W.B]}},
B:{"^":"n;bG:style=",
gaA:function(a){return new W.cL(a,a.children)},
h:function(a){return a.localName},
$isB:1,
$isa:1,
$isf:1,
"%":";Element"},
hR:{"^":"aL;K:error=","%":"ErrorEvent"},
aL:{"^":"f;","%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|ClipboardEvent|CloseEvent|CompositionEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|DragEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FocusEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|KeyboardEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MouseEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PointerEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SVGZoomEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TextEvent|TouchEvent|TrackEvent|TransitionEvent|UIEvent|USBConnectionEvent|WebGLContextEvent|WebKitTransitionEvent|WheelEvent;Event|InputEvent"},
bh:{"^":"f;",
bT:function(a,b,c,d){return a.addEventListener(b,H.ap(c,1),!1)},
c9:function(a,b,c,d){return a.removeEventListener(b,H.ap(c,1),!1)},
"%":"MediaStream|MessagePort|ScreenOrientation;EventTarget"},
i8:{"^":"M;j:length=","%":"HTMLFormElement"},
ia:{"^":"dQ;",
gj:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.ae(b,a,null,null,null))
return a[b]},
t:function(a,b,c){throw H.e(new P.A("Cannot assign element of immutable List."))},
v:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.n]},
$ish:1,
$ash:function(){return[W.n]},
$isE:1,
$asE:function(){return[W.n]},
$isy:1,
$asy:function(){return[W.n]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
dO:{"^":"f+S;",
$asi:function(){return[W.n]},
$ash:function(){return[W.n]},
$isi:1,
$ish:1},
dQ:{"^":"dO+c6;",
$asi:function(){return[W.n]},
$ash:function(){return[W.n]},
$isi:1,
$ish:1},
dL:{"^":"M;",$isa:1,"%":"HTMLImageElement"},
ic:{"^":"M;",$isB:1,$isf:1,"%":"HTMLInputElement"},
ig:{"^":"f;",
h:function(a){return String(a)},
"%":"Location"},
ij:{"^":"M;K:error=","%":"HTMLAudioElement|HTMLMediaElement|HTMLVideoElement"},
iv:{"^":"f;",$isf:1,"%":"Navigator"},
eU:{"^":"ah;a",
t:function(a,b,c){var z,y
z=this.a
y=z.childNodes
if(b>>>0!==b||b>=y.length)return H.b(y,b)
z.replaceChild(c,y[b])},
gu:function(a){var z=this.a.childNodes
return new W.c5(z,z.length,-1,null)},
gj:function(a){return this.a.childNodes.length},
i:function(a,b){var z=this.a.childNodes
if(b>>>0!==b||b>=z.length)return H.b(z,b)
return z[b]},
$asah:function(){return[W.n]},
$asi:function(){return[W.n]},
$ash:function(){return[W.n]}},
n:{"^":"bh;",
cO:function(a,b){var z,y
try{z=a.parentNode
J.dj(z,b,a)}catch(y){H.J(y)}return a},
bV:function(a){var z
for(;z=a.firstChild,z!=null;)a.removeChild(z)},
h:function(a){var z=a.nodeValue
return z==null?this.bI(a):z},
ca:function(a,b,c){return a.replaceChild(b,c)},
$isa:1,
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
iw:{"^":"dR;",
gj:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.ae(b,a,null,null,null))
return a[b]},
t:function(a,b,c){throw H.e(new P.A("Cannot assign element of immutable List."))},
v:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.n]},
$ish:1,
$ash:function(){return[W.n]},
$isE:1,
$asE:function(){return[W.n]},
$isy:1,
$asy:function(){return[W.n]},
"%":"NodeList|RadioNodeList"},
dP:{"^":"f+S;",
$asi:function(){return[W.n]},
$ash:function(){return[W.n]},
$isi:1,
$ish:1},
dR:{"^":"dP+c6;",
$asi:function(){return[W.n]},
$ash:function(){return[W.n]},
$isi:1,
$ish:1},
iz:{"^":"M;j:length=","%":"HTMLSelectElement"},
iA:{"^":"aL;K:error=","%":"SpeechRecognitionError"},
eL:{"^":"bh;",
cK:function(a,b,c,d){var z=W.eW(a.open(b,c))
return z},
X:function(a,b,c){return this.cK(a,b,c,null)},
gbw:function(a){return"scrollY" in a?C.a.P(a.scrollY):C.a.P(a.document.documentElement.scrollTop)},
$isf:1,
"%":"DOMWindow|Window"},
iJ:{"^":"f;cC:height=,cI:left=,cS:top=,cU:width=",
h:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(a.width)+" x "+H.d(a.height)},
n:function(a,b){var z,y,x
if(b==null)return!1
z=J.m(b)
if(!z.$iscs)return!1
y=a.left
x=z.gcI(b)
if(y==null?x==null:y===x){y=a.top
x=z.gcS(b)
if(y==null?x==null:y===x){y=a.width
x=z.gcU(b)
if(y==null?x==null:y===x){y=a.height
z=z.gcC(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gp:function(a){var z,y,x,w,v
z=J.P(a.left)
y=J.P(a.top)
x=J.P(a.width)
w=J.P(a.height)
w=W.b0(W.b0(W.b0(W.b0(0,z),y),x),w)
v=536870911&w+((67108863&w)<<3)
v^=v>>>11
return 536870911&v+((16383&v)<<15)},
$iscs:1,
$ascs:I.w,
"%":"ClientRect"},
iK:{"^":"n;",$isf:1,"%":"DocumentType"},
iN:{"^":"M;",$isf:1,"%":"HTMLFrameSetElement"},
iR:{"^":"bh;",$isf:1,"%":"ServiceWorker"},
f2:{"^":"ai;a,b,c,$ti",
W:function(a,b,c,d){return W.o(this.a,this.b,a,!1,H.a6(this,0))},
bi:function(a,b,c){return this.W(a,null,b,c)}},
iL:{"^":"f2;a,b,c,$ti"},
f3:{"^":"ex;a,b,c,d,e,$ti",
a9:function(){if(this.b==null)return
this.b8()
this.b=null
this.d=null
return},
aC:function(a,b){if(this.b==null)return;++this.a
this.b8()},
bk:function(a){return this.aC(a,null)},
bm:function(){if(this.b==null||this.a<=0)return;--this.a
this.b6()},
b6:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dh(x,this.c,z,!1)}},
b8:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.di(x,this.c,z,!1)}},
bP:function(a,b,c,d,e){this.b6()},
k:{
o:function(a,b,c,d,e){var z=c==null?null:W.fI(new W.f4(c))
z=new W.f3(0,a,b,z,!1,[e])
z.bP(a,b,c,!1,e)
return z}}},
f4:{"^":"c:0;a",
$1:function(a){return this.a.$1(a)}},
c6:{"^":"a;$ti",
gu:function(a){return new W.c5(a,this.gj(a),-1,null)},
$isi:1,
$asi:null,
$ish:1,
$ash:null},
c5:{"^":"a;a,b,c,d",
l:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.bL(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gm:function(){return this.d}},
eV:{"^":"a;a",$isf:1,k:{
eW:function(a){if(a===window)return a
else return new W.eV(a)}}}}],["","",,P,{"^":"",
c_:function(){var z=$.bZ
if(z==null){z=J.bc(window.navigator.userAgent,"Opera",0)
$.bZ=z}return z},
dC:function(){var z,y
z=$.bW
if(z!=null)return z
y=$.bX
if(y==null){y=J.bc(window.navigator.userAgent,"Firefox",0)
$.bX=y}if(y)z="-moz-"
else{y=$.bY
if(y==null){y=P.c_()!==!0&&J.bc(window.navigator.userAgent,"Trident/",0)
$.bY=y}if(y)z="-ms-"
else z=P.c_()===!0?"-o-":"-webkit-"}$.bW=z
return z},
dH:{"^":"ah;a,b",
ga6:function(){var z,y
z=this.b
y=H.r(z,"S",0)
return new H.aR(new H.eJ(z,new P.dI(),[y]),new P.dJ(),[y,null])},
t:function(a,b,c){var z=this.ga6()
J.dl(z.b.$1(J.aH(z.a,b)),c)},
B:function(a,b){this.b.a.appendChild(b)},
gj:function(a){return J.aa(this.ga6().a)},
i:function(a,b){var z=this.ga6()
return z.b.$1(J.aH(z.a,b))},
gu:function(a){var z=P.aQ(this.ga6(),!1,W.B)
return new J.bd(z,z.length,0,null)},
$asah:function(){return[W.B]},
$asi:function(){return[W.B]},
$ash:function(){return[W.B]}},
dI:{"^":"c:0;",
$1:function(a){return!!J.m(a).$isB}},
dJ:{"^":"c:0;",
$1:function(a){return H.hm(a,"$isB")}}}],["","",,P,{"^":""}],["","",,P,{"^":"",hK:{"^":"at;",$isf:1,"%":"SVGAElement"},hM:{"^":"k;",$isf:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},hS:{"^":"k;",$isf:1,"%":"SVGFEBlendElement"},hT:{"^":"k;",$isf:1,"%":"SVGFEColorMatrixElement"},hU:{"^":"k;",$isf:1,"%":"SVGFEComponentTransferElement"},hV:{"^":"k;",$isf:1,"%":"SVGFECompositeElement"},hW:{"^":"k;",$isf:1,"%":"SVGFEConvolveMatrixElement"},hX:{"^":"k;",$isf:1,"%":"SVGFEDiffuseLightingElement"},hY:{"^":"k;",$isf:1,"%":"SVGFEDisplacementMapElement"},hZ:{"^":"k;",$isf:1,"%":"SVGFEFloodElement"},i_:{"^":"k;",$isf:1,"%":"SVGFEGaussianBlurElement"},i0:{"^":"k;",$isf:1,"%":"SVGFEImageElement"},i1:{"^":"k;",$isf:1,"%":"SVGFEMergeElement"},i2:{"^":"k;",$isf:1,"%":"SVGFEMorphologyElement"},i3:{"^":"k;",$isf:1,"%":"SVGFEOffsetElement"},i4:{"^":"k;",$isf:1,"%":"SVGFESpecularLightingElement"},i5:{"^":"k;",$isf:1,"%":"SVGFETileElement"},i6:{"^":"k;",$isf:1,"%":"SVGFETurbulenceElement"},i7:{"^":"k;",$isf:1,"%":"SVGFilterElement"},at:{"^":"k;",$isf:1,"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},ib:{"^":"at;",$isf:1,"%":"SVGImageElement"},ih:{"^":"k;",$isf:1,"%":"SVGMarkerElement"},ii:{"^":"k;",$isf:1,"%":"SVGMaskElement"},ix:{"^":"k;",$isf:1,"%":"SVGPatternElement"},iy:{"^":"k;",$isf:1,"%":"SVGScriptElement"},k:{"^":"B;",
gaA:function(a){return new P.dH(a,new W.eU(a))},
$isf:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},iB:{"^":"at;",$isf:1,"%":"SVGSVGElement"},iC:{"^":"k;",$isf:1,"%":"SVGSymbolElement"},eC:{"^":"at;","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement;SVGTextContentElement"},iD:{"^":"eC;",$isf:1,"%":"SVGTextPathElement"},iE:{"^":"at;",$isf:1,"%":"SVGUseElement"},iF:{"^":"k;",$isf:1,"%":"SVGViewElement"},iM:{"^":"k;",$isf:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},iO:{"^":"k;",$isf:1,"%":"SVGCursorElement"},iP:{"^":"k;",$isf:1,"%":"SVGFEDropShadowElement"},iQ:{"^":"k;",$isf:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,F,{"^":"",
iX:[function(){var z,y,x
z=document
y=z.body;(y&&C.o).bV(y)
z=z.documentElement
y=z.clientWidth
y.toString
x=window.innerWidth
x.toString
$.u=Math.max(H.F(y),H.F(x))
z=z.clientHeight
z.toString
x=window.innerHeight
x.toString
$.a8=Math.max(H.F(z),H.F(x))
F.fU()
x=W.aL
W.o(window,"resize",new F.hw(),!1,x)
z=window.screen.orientation
z.toString
W.o(z,"change",new F.hx(),!1,x)
W.o(window,"scroll",new F.hy(),!1,x)},"$0","d6",0,0,2],
d9:function(){var z=Date.now()
$.d7=new P.bg(z,!1)
if(C.e.I(P.c0(0,0,0,z-$.$get$bH().a,0,0).a,1000)<C.e.I($.$get$bD().a,1000)){z=$.de
if(z!=null)z.a9()
$.de=P.cw($.$get$bD(),F.hv())}$.bH=$.d7},
iY:[function(){var z,y,x,w
z=$.u
y=document.documentElement
x=y.clientWidth
x.toString
w=window.innerWidth
w.toString
if(z!==Math.max(H.F(x),H.F(w)))window.location.reload()
else{z=y.clientHeight
z.toString
y=window.innerHeight
y.toString
$.a8=Math.max(H.F(z),H.F(y))
F.fJ()}},"$0","hv",0,0,2],
fK:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.t([],[W.bS])
for(y=W.aL,x=0;x<3;++x){w={}
v=$.aG
u=$.a8
if(typeof v!=="number")return v.bv()
if(typeof u!=="number")return H.O(u)
if(v>u){t=c[x]
c[x]=t-(v-u)*t/v*$.aF}s=document.createElement("canvas")
z.push(s)
if(x>=z.length)return H.b(z,x)
z[x].width=C.a.aG(b[x])
if(x>=z.length)return H.b(z,x)
z[x].height=C.a.aG(c[x])
r=W.x(null,null,null)
r.src=a[x]
v=b[x]
u=$.$get$aD()
if(x>=u.length)return H.b(u,x)
u=u[x]
q=v/u
w.a=q
w.b=0
t=$.$get$aC()
if(x>=t.length)return H.b(t,x)
t=t[x]
p=c[x]
if(t*q<p){q=p/t
w.a=q
w.b=(u*q-v)*0.5}$.$get$b3().push(r)
W.o(r,"load",new F.fL(w,z,x,r),!1,y)
if(x>=z.length)return H.b(z,x)
v=z[x]
u=v.style
u.zIndex="-1"
u=v.style
u.position="absolute"
v=v.style
u=$.u
t=b[x]
if(typeof u!=="number")return u.aI()
t=C.a.h((u-t)*0.5)+"px"
v.left=t
$.$get$b4().push(b[x])
$.$get$aB().push(c[x])
v=window
v="scrollY" in v?C.a.P(v.scrollY):C.a.P(v.document.documentElement.scrollTop)
$.bb=v
o=v*$.aF
for(n=0;n<x;++n){v=$.$get$aB()
if(n>=v.length)return H.b(v,n)
o+=v[n]}if(x>=z.length)return H.b(z,x)
v=z[x].style
u=C.a.h(o)+"px"
v.top=u
v=$.$get$C()
if(x>=z.length)return H.b(z,x)
v.push(z[x])}$.$get$aD()
$.$get$aC()
y=document.body
new W.cL(y,y.children).ce(0,z)},
fJ:function(){var z,y,x,w,v,u,t,s,r,q,p
z=$.$get$C().length
y=$.aG
if(typeof y!=="number")return y.w()
x=y*0.3
w=[y*0.4,x,x]
for(v=0;v<z;++v){y=$.aG
x=$.a8
if(typeof y!=="number")return y.bv()
if(typeof x!=="number")return H.O(x)
if(y>x){if(v>=3)return H.b(w,v)
u=w[v]
w[v]=u-(y-x)*u/y*$.aF}y=$.$get$C()
if(v>=y.length)return H.b(y,v)
y=y[v]
if(v>=3)return H.b(w,v)
y.height=C.a.aG(w[v])
y=$.$get$b4()
if(v>=y.length)return H.b(y,v)
y=y[v]
x=$.$get$aD()
if(v>=x.length)return H.b(x,v)
x=x[v]
t=y/x
u=$.$get$aC()
if(v>=u.length)return H.b(u,v)
u=u[v]
s=w[v]
if(u*t<s){t=s/u
r=(x*t-y)*0.5}else r=0
y=$.$get$C()
if(v>=y.length)return H.b(y,v)
y[v].getContext("2d").resetTransform()
y=$.$get$C()
if(v>=y.length)return H.b(y,v)
y[v].getContext("2d").translate(-r,0)
y=$.$get$C()
if(v>=y.length)return H.b(y,v)
y[v].getContext("2d").scale(t,t)
y=$.$get$C()
if(v>=y.length)return H.b(y,v)
y=y[v].getContext("2d")
x=$.$get$b3()
if(v>=x.length)return H.b(x,v)
y.drawImage(x[v],0,0)
x=$.$get$aB()
y=w[v]
if(v>=x.length)return H.b(x,v)
x[v]=y
y=window
y="scrollY" in y?C.a.P(y.scrollY):C.a.P(y.document.documentElement.scrollTop)
$.bb=y
q=y*$.aF
for(p=0;p<v;++p)q+=w[p]
y=$.$get$C()
if(v>=y.length)return H.b(y,v)
y=y[v].style
x=C.a.h(q)+"px"
y.top=x}},
hD:function(a){var z,y,x,w,v
z=$.$get$C().length
for(y=0;y<z;++y){x=$.$get$C()
if(y>=x.length)return H.b(x,y)
x=x[y].style.top
w=H.ep(H.hH(x,"px",""),null)
x=$.$get$C()
if(y>=x.length)return H.b(x,y)
x=x[y].style
v=J.Q(J.a9(w,a))+"px"
x.top=v}},
fU:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9
z=$.u
z.toString
if(typeof z!=="number")return z.w()
y=z*0.05
x=y*0.8
w=y*0.6
v=y*0.3
u=document
t=u.createElement("div")
s=t.style
s.position="fixed"
s=t.style
r=C.a.h(z)+"px"
s.width=r
s=t.style
r=C.a.h(y)+"px"
s.height=r
s=t.style
s.zIndex="2"
s=t.style
s.backgroundColor="rgba(200,200,200,0.95)"
q=W.x(null,null,null)
q.src="./images/google_play_logo_white.png"
s=q.style
r=C.a.h(y)+"px"
s.height=r
s=W.ik
W.o(q,"mouseenter",new F.fV(q),!1,s)
W.o(q,"mouseleave",new F.fW(q),!1,s)
W.o(q,"click",new F.fX(),!1,s)
r=q.style
r.position="absolute"
r=q.style
p=(y-y)*0.5
o=C.a.h(p)+"px"
r.top=o
r=q.style
o=C.a.h(3*v+2*y)+"px"
r.right=o
n=W.x(null,null,null)
n.src="./images/amazon_logo_white.png"
r=n.style
o=C.a.h(y)+"px"
r.height=o
W.o(n,"mouseenter",new F.h1(n),!1,s)
W.o(n,"mouseleave",new F.h2(n),!1,s)
W.o(n,"click",new F.h3(),!1,s)
r=n.style
r.position="absolute"
r=n.style
o=C.a.h(p)+"px"
r.top=o
r=n.style
o=2*v
m=C.a.h(o+y)+"px"
r.right=m
l=W.x(null,null,null)
l.src="./images/samsung_logo_white.png"
r=l.style
m=C.a.h(y)+"px"
r.height=m
W.o(l,"mouseenter",new F.h4(l),!1,s)
W.o(l,"mouseleave",new F.h5(l),!1,s)
W.o(l,"click",new F.h6(),!1,s)
r=l.style
r.position="absolute"
r=l.style
p=C.a.h(p)+"px"
r.top=p
r=l.style
p=C.a.h(v)+"px"
r.right=p
k=u.createElement("div")
k.textContent="GET THE TRIAL VERSION"
r=k.style
p=C.a.h(y)+"px"
r.height=p
r=k.style
r.fontFamily="Poiret One"
r=k.style
C.c.H(r,(r&&C.c).G(r,"text-fill-color"),"white","")
r=k.style
r.position="absolute"
r=k.style
p=C.a.h(v)+"px"
r.fontSize=p
r=k.style
p=C.a.h((y-v)*0.5)+"px"
r.top=p
r=k.style
p=C.a.h(4*v+3*y)+"px"
r.right=p
j=W.x(null,null,null)
j.src="./images/logo.png"
r=j.style
p=C.a.h(x)+"px"
r.height=p
r=j.style
r.position="absolute"
r=j.style
p=C.a.h((y-x)*0.5)+"px"
r.top=p
r=j.style
p=C.a.h(v)+"px"
r.left=p
i=u.createElement("div")
i.textContent="INK&PAPER"
r=i.style
r.fontFamily="Poiret One"
r=i.style
p=C.a.h(w)+"px"
r.height=p
r=i.style
p=C.a.h(w)+"px"
r.fontSize=p
r=i.style
r.position="absolute"
r=i.style
p=C.a.h(v+x*1.1)+"px"
r.left=p
r=i.style
p=C.a.h((x-w)*0.5)+"px"
r.top=p
r=i.style
C.c.H(r,(r&&C.c).G(r,"text-fill-color"),"white","")
t.appendChild(q)
t.appendChild(n)
t.appendChild(l)
t.appendChild(k)
t.appendChild(j)
t.appendChild(i)
h=$.u
h.toString
if(typeof h!=="number")return h.cV()
g=h/1280*243
f=h*0.8
e=g+f/1280*125
d=y*1.5
c=u.createElement("div")
r=c.style
p=C.a.h(h)+"px"
r.width=p
r=c.style
p=C.f.h(e)+"px"
r.height=p
r=c.style
p=C.a.h(d)+"px"
r.top=p
r=c.style
r.position="relative"
b=W.x(null,null,null)
r=b.style
r.position="absolute"
b.setAttribute("src","./images/banner.png")
r=b.style
p=C.a.h(h)+"px"
r.width=p
a=W.x(null,null,null)
a.src="./images/subtitle.png"
r=a.style
r.position="absolute"
r=a.style
p=C.a.h(f)+"px"
r.width=p
r=a.style
p=$.u
if(typeof p!=="number")return p.aI()
p=C.a.h((p-f)*0.5)+"px"
r.left=p
r=a.style
p=C.f.h(g)+"px"
r.top=p
c.appendChild(b)
c.appendChild(a)
r=$.u
if(typeof r!=="number")return r.w()
a0=r*0.02
a1=r*0.04
a2=r*0.5
a3=r*0.1
a4=a2*0.65
p=a2-a4
a5=p/1280*536
a6=u.createElement("div")
m=a6.style
m.position="relative"
m=a6.style
a7=C.a.h(d)+"px"
m.top=a7
m=a6.style
a7=C.a.h(a3)+"px"
m.marginTop=a7
m=a6.style
r=C.a.h(r)+"px"
m.width=r
r=a6.style
m=C.a.h(a2)+"px"
r.height=m
a8=u.createElement("div")
a8.textContent="Write on your Android device smootly as you would with a pen on the paper. Seven different types of customizable strokes will provide you a whole range of possibilities. The digital ink algorithm is entirely vector based: your pages will never lose details."
r=a8.style
r.position="absolute"
r=a8.style
m=C.f.h(a5)+"px"
r.top=m
r=a8.style
m=C.a.h(a3*0.5)+"px"
r.left=m
r=a8.style
m=C.a.h(a2-a3)+"px"
r.maxWidth=m
r=a8.style
r.fontFamily="Poiret One"
r=a8.style
r.fontStyle="normal"
r=a8.style
m=C.a.h(a0)+"px"
r.fontSize=m
r=a8.style
r.textAlign="left"
r=a8.style
m=C.a.h(a1)+"px"
r.lineHeight=m
a9=W.x(null,null,null)
a9.src="./images/pen.png"
r=a9.style
r.position="absolute"
r=a9.style
p=C.a.h(p)+"px"
r.width=p
r=a9.style
p=C.a.h(a4*0.5)+"px"
r.left=p
a6.appendChild(a8)
a6.appendChild(a9)
r=$.u
r.toString
if(typeof r!=="number")return r.w()
b0=r*0.53
b1=r*0.5
b2=r*0.1
b3=b1*0.1
p=b1-b3
b4=u.createElement("div")
m=b4.style
m.backgroundColor="rgba(182,220,0,1)"
m=b4.style
m.position="relative"
m=b4.style
r=C.a.h(r)+"px"
m.width=r
r=b4.style
m=C.a.h(b0)+"px"
r.height=m
r=b4.style
m=C.e.h(0)+"px"
r.marginTop=m
b5=W.x(null,null,null)
r=b5.style
r.position="absolute"
b5.src="./images/tablet1.png"
r=b5.style
m=C.a.h(p)+"px"
r.width=m
r=b5.style
p=C.a.h((b0-p/1251*860)*0.5)+"px"
r.top=p
r=b5.style
p=C.a.h(b3*0.5)+"px"
r.left=p
b6=u.createElement("div")
b6.textContent="Unleash your creativity by adding typedtexts and geometrical shapes to your manuscripts. The latter are immediately recognized and can be modified through a versatile user interface. You may also need to import external images: the supported formats are PDF (full vector based), PNG and JPEG.  The images are embedded in the document during the exportation process, always ensuring the best possible result."
r=b6.style
r.position="absolute"
r=b6.style
p=C.f.h(a5)+"px"
r.top=p
r=b6.style
p=C.a.h(b2*0.5)+"px"
r.right=p
r=b6.style
b2=C.a.h(b1-b2)+"px"
r.maxWidth=b2
r=b6.style
r.fontFamily="Poiret One"
r=b6.style
r.fontStyle="normal"
r=b6.style
p=C.a.h(a0)+"px"
r.fontSize=p
r=b6.style
r.textAlign="left"
r=b6.style
p=C.a.h(a1)+"px"
r.lineHeight=p
b4.appendChild(b5)
b4.appendChild(b6)
r=$.u
r.toString
if(typeof r!=="number")return r.w()
b7=r*0.37
b8=r*0.1
b9=r*0.5
c0=b9*0.65
p=b9-c0
c1=u.createElement("div")
m=c1.style
m.position="relative"
m=c1.style
a7=C.a.h(b8)+"px"
m.marginTop=a7
m=c1.style
r=C.a.h(r)+"px"
m.width=r
r=c1.style
m=C.a.h(b7)+"px"
r.height=m
c2=u.createElement("div")
c2.textContent="Copy, cut, paste, zoom, rotate, flip, stretch any on-screen object, and use layers to achieve overlap and transparency effects. With these tools, everything will be exactly as you want it."
r=c2.style
r.position="absolute"
r=c2.style
m=C.f.h(p/1280*536)+"px"
r.top=m
r=c2.style
m=C.a.h(b8*0.5)+"px"
r.left=m
r=c2.style
b9=C.a.h(b9-b8)+"px"
r.maxWidth=b9
r=c2.style
r.fontFamily="Poiret One"
r=c2.style
r.fontStyle="normal"
r=c2.style
m=C.a.h(a0)+"px"
r.fontSize=m
r=c2.style
r.textAlign="left"
r=c2.style
m=C.a.h(a1)+"px"
r.lineHeight=m
c3=W.x(null,null,null)
c3.src="./images/cut_paste_layers.png"
r=c3.style
r.position="absolute"
r=c3.style
p=C.a.h(p)+"px"
r.width=p
r=c3.style
p=C.a.h(c0*0.5)+"px"
r.left=p
c1.appendChild(c2)
c1.appendChild(c3)
r=$.u
r.toString
if(typeof r!=="number")return r.w()
c4=r*0.4
c5=r*0.5
c6=r*0.1
c7=c5*0.1
p=c5-c7
c8=u.createElement("div")
m=c8.style
m.backgroundColor="rgba(182,220,0,1)"
m=c8.style
m.position="relative"
m=c8.style
r=C.a.h(r)+"px"
m.width=r
r=c8.style
m=C.a.h(c4)+"px"
r.height=m
r=c8.style
m=C.e.h(0)+"px"
r.marginTop=m
c9=W.x(null,null,null)
r=c9.style
r.position="absolute"
c9.src="./images/tablet2.png"
r=c9.style
m=C.a.h(p)+"px"
r.width=m
r=c9.style
p=C.a.h((c4-p/1251*860)*0.5)+"px"
r.top=p
r=c9.style
p=C.a.h(c7*0.5)+"px"
r.left=p
d0=u.createElement("div")
d0.textContent="Keep your notes organised in a library, grouping them into folders. Rotate, flip, replace the background and choose the export area of any page. Move or copy pages from one notepad to another, or notepads from one folder to another. "
r=d0.style
r.position="absolute"
r=d0.style
p=C.f.h(a5)+"px"
r.top=p
r=d0.style
p=C.a.h(c6*0.5)+"px"
r.right=p
r=d0.style
c6=C.a.h(c5-c6)+"px"
r.maxWidth=c6
r=d0.style
r.fontFamily="Poiret One"
r=d0.style
r.fontStyle="normal"
r=d0.style
p=C.a.h(a0)+"px"
r.fontSize=p
r=d0.style
r.textAlign="left"
r=d0.style
p=C.a.h(a1)+"px"
r.lineHeight=p
c8.appendChild(c9)
c8.appendChild(d0)
r=$.u
r.toString
if(typeof r!=="number")return r.w()
d1=r*0.3
d2=r*0.1
d3=r*0.5
d4=d3*0.6
p=d3-d4
d5=u.createElement("div")
m=d5.style
m.position="relative"
m=d5.style
a7=C.a.h(d2)+"px"
m.marginTop=a7
m=d5.style
r=C.a.h(r)+"px"
m.width=r
r=d5.style
m=C.a.h(d1)+"px"
r.height=m
d6=u.createElement("div")
d6.textContent="The trial version allows you to import and write on PDF, PNG, and JPEG files. By upgrading to the full version, you will be able to export notes in the same formats, and create a backup copy of any library section."
r=d6.style
r.position="absolute"
r=d6.style
m=C.f.h(p/1280*536)+"px"
r.top=m
r=d6.style
m=C.a.h(d2*0.5)+"px"
r.left=m
r=d6.style
d3=C.a.h(d3-d2)+"px"
r.maxWidth=d3
r=d6.style
r.fontFamily="Poiret One"
r=d6.style
r.fontStyle="normal"
r=d6.style
m=C.a.h(a0)+"px"
r.fontSize=m
r=d6.style
r.textAlign="left"
r=d6.style
m=C.a.h(a1)+"px"
r.lineHeight=m
r=d6.style
C.c.H(r,(r&&C.c).G(r,"text-fill-color"),"white","")
d7=W.x(null,null,null)
d7.src="./images/backup_pdf.png"
r=d7.style
r.position="absolute"
r=d7.style
p=C.a.h(p)+"px"
r.width=p
r=d7.style
p=C.a.h(d4*0.5)+"px"
r.left=p
d5.appendChild(d6)
d5.appendChild(d7)
r=$.u
r.toString
if(typeof r!=="number")return r.w()
d8=r*0.1
d9=r*0.01
e0=r*0.04
e1=u.createElement("div")
p=e1.style
p.backgroundColor="rgba(182,220,0,1)"
p=e1.style
p.position="relative"
p=e1.style
m=C.a.h(r)+"px"
p.width=m
p=e1.style
m=C.a.h(d8)+"px"
p.height=m
p=e1.style
m=C.a.h(d8)+"px"
p.marginTop=m
e2=u.createElement("div")
e2.textContent="For a video tutorial, where the most common features of the app are shown, check these two links:"
p=e2.style
p.position="absolute"
p=e2.style
m=C.a.h(d8*0.5)+"px"
p.left=m
p=e2.style
r=C.a.h(r-d8)+"px"
p.maxWidth=r
r=e2.style
r.fontFamily="Poiret One"
r=e2.style
r.fontStyle="normal"
r=e2.style
p=C.a.h(a0)+"px"
r.fontSize=p
r=e2.style
r.textAlign="left"
r=e2.style
p=C.a.h(a1)+"px"
r.lineHeight=p
e3=W.bM(null)
e3.href="https://www.youtube.com/watch?v=n8vdanFcmd4&index=1&list=PL3VL6s-M7yoeFSHGs-Z2qJdVV_WcdMuy6&t"
e3.textContent="LIBRARY"
r=e3.style
r.fontFamily="Poiret One"
r=e3.style
p=C.a.h(a0)+"px"
r.fontSize=p
r=e3.style
C.c.H(r,(r&&C.c).G(r,"text-fill-color"),"white","")
r=e3.style
r.backgroundColor="rgba(150,150,150,1)"
r=e3.style
p=C.a.h(d9)+"px"
r.padding=p
r=e3.style
p=C.a.h(d9)+"px"
C.c.H(r,(r&&C.c).G(r,"border-radius"),p,"")
p=e3.style
p.textDecoration="none"
r=e3.style
r.position="absolute"
r=e3.style
p=C.a.h(e0)+"px"
r.top=p
r=e3.style
p=$.u
if(typeof p!=="number")return p.w()
p=C.a.h(p*0.4)+"px"
r.left=p
e4=W.bM(null)
e4.href="https://www.youtube.com/watch?v=7EXMg9Q1Q_g&index=2&list=PL3VL6s-M7yoeFSHGs-Z2qJdVV_WcdMuy6"
e4.textContent="EDITOR"
r=e4.style
r.fontFamily="Poiret One"
r=e4.style
p=C.a.h(a0)+"px"
r.fontSize=p
r=e4.style
C.c.H(r,(r&&C.c).G(r,"text-fill-color"),"white","")
r=e4.style
r.backgroundColor="rgba(150,150,150,1)"
r=e4.style
p=C.a.h(d9)+"px"
r.padding=p
r=e4.style
p=C.a.h(d9)+"px"
C.c.H(r,(r&&C.c).G(r,"border-radius"),p,"")
p=e4.style
p.textDecoration="none"
r=e4.style
r.position="absolute"
r=e4.style
p=C.a.h(e0)+"px"
r.top=p
r=e4.style
p=$.u
if(typeof p!=="number")return p.w()
p=C.a.h(p*0.5)+"px"
r.left=p
e1.appendChild(e2)
e1.appendChild(e3)
e1.appendChild(e4)
e5=y*0.75
e6=W.f_("footer",null)
r=J.a5(e6)
p=r.gbG(e6)
m=C.a.h(z)+"px"
p.width=m
p=e6.style
m=C.a.h(d)+"px"
p.height=m
p=e6.style
p.zIndex="1"
p=e6.style
p.backgroundColor="rgba(200,200,200,1)"
p=e6.style
p.position="relative"
p=e6.style
m=C.a.h(y+v)+"px"
p.top=m
e7=W.x(null,null,null)
e7.src="./images/mail_white.png"
W.o(e7,"mouseenter",new F.h7(e7),!1,s)
W.o(e7,"mouseleave",new F.h8(e7),!1,s)
p=e7.style
m=C.a.h(e5)+"px"
p.height=m
p=e7.style
p.position="absolute"
p=e7.style
m=C.a.h(v)+"px"
p.right=m
p=e7.style
m=(d-e5)*0.5
a7=C.a.h(m)+"px"
p.top=a7
W.o(e7,"click",new F.fY(),!1,s)
e8=W.x(null,null,null)
e8.src="./images/facebook_white.png"
W.o(e8,"mouseenter",new F.fZ(e8),!1,s)
W.o(e8,"mouseleave",new F.h_(e8),!1,s)
p=e8.style
a7=C.a.h(e5)+"px"
p.height=a7
p=e8.style
p.position="absolute"
p=e8.style
o=C.a.h(o+e5)+"px"
p.right=o
p=e8.style
m=C.a.h(m)+"px"
p.top=m
W.o(e8,"click",new F.h0(),!1,s)
r.gaA(e6).B(0,e8)
r.gaA(e6).B(0,e7)
$.aG=d+e+a3+a2+0+b0+b8+b7+0+c4+d2+d1+d8+d8
u.body.appendChild(t)
u.body.appendChild(c)
u.body.appendChild(a6)
u.body.appendChild(b4)
u.body.appendChild(c1)
u.body.appendChild(c8)
u.body.appendChild(d5)
u.body.appendChild(e1)
u.body.appendChild(e6)
u=$.$get$C();(u&&C.d).sj(u,0)
u=$.$get$b4();(u&&C.d).sj(u,0)
u=$.$get$aB();(u&&C.d).sj(u,0)
u=$.$get$b3();(u&&C.d).sj(u,0)
$.aD=[1920,1920,1920]
$.aC=[1594,1236,1154]
e9=$.u
e9.toString
u=$.aG
if(typeof u!=="number")return u.w()
s=u*0.3
F.fK(["./images/background1.png","./images/background2.png","./images/background3.png"],[e9,e9,e9],[u*0.4,s,s])},
hw:{"^":"c:0;",
$1:function(a){F.d9()}},
hx:{"^":"c:0;",
$1:function(a){var z,y,x
z=document.documentElement
y=z.clientWidth
y.toString
x=window.innerWidth
x.toString
$.u=Math.max(H.F(y),H.F(x))
z=z.clientHeight
z.toString
x=window.innerHeight
x.toString
$.a8=Math.max(H.F(z),H.F(x))
F.d9()}},
hy:{"^":"c:0;",
$1:function(a){var z,y,x,w
z=C.i.gbw(window)
y=$.a8
x=window.innerHeight
x.toString
$.a8=x
if(typeof x!=="number")return x.aI()
if(typeof y!=="number")return H.O(y)
w=$.bb
if(typeof w!=="number")return H.O(w)
F.hD((x-y+z-w)*$.aF)
$.bb=z}},
fL:{"^":"c:0;a,b,c,d",
$1:function(a){var z,y,x,w
z=this.b
y=this.c
if(y>=z.length)return H.b(z,y)
x=this.a
z[y].getContext("2d").translate(-x.b,0)
if(y>=z.length)return H.b(z,y)
w=z[y].getContext("2d")
x=x.a
w.scale(x,x)
if(y>=z.length)return H.b(z,y)
z[y].getContext("2d").drawImage(this.d,0,0)}},
fV:{"^":"c:0;a",
$1:function(a){this.a.src="./images/google_play_logo_color.png"}},
fW:{"^":"c:0;a",
$1:function(a){this.a.src="./images/google_play_logo_white.png"}},
fX:{"^":"c:0;",
$1:function(a){C.i.X(window,"http://play.google.com/store/apps/details?id=com.inkandpaper.trial","google_link")}},
h1:{"^":"c:0;a",
$1:function(a){this.a.src="./images/amazon_logo_color.png"}},
h2:{"^":"c:0;a",
$1:function(a){this.a.src="./images/amazon_logo_white.png"}},
h3:{"^":"c:0;",
$1:function(a){C.i.X(window,"http://www.amazon.com/gp/mas/dl/android?p=com.inkandpaper.trial","amazon_link")}},
h4:{"^":"c:0;a",
$1:function(a){this.a.src="./images/samsung_logo_color.png"}},
h5:{"^":"c:0;a",
$1:function(a){this.a.src="./images/samsung_logo_white.png"}},
h6:{"^":"c:0;",
$1:function(a){C.i.X(window,"http://www.samsungapps.com/appquery/appDetail.as?appId=com.inkandpaper.trial","samsung_link")}},
h7:{"^":"c:0;a",
$1:function(a){this.a.src="./images/mail_color.png"}},
h8:{"^":"c:0;a",
$1:function(a){this.a.src="./images/mail_white.png"}},
fY:{"^":"c:0;",
$1:function(a){C.i.X(window,"mailto:inkandpaper.app@gmail.com?","mail_link")}},
fZ:{"^":"c:0;a",
$1:function(a){this.a.src="./images/facebook_color.png"}},
h_:{"^":"c:0;a",
$1:function(a){this.a.src="./images/facebook_white.png"}},
h0:{"^":"c:0;",
$1:function(a){C.i.X(window,"https://www.facebook.com/pg/HandwritePDFNotes/posts/?v=wall","facebook_link")}}},1]]
setupProgram(dart,0)
J.m=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cc.prototype
return J.cb.prototype}if(typeof a=="string")return J.aP.prototype
if(a==null)return J.e2.prototype
if(typeof a=="boolean")return J.e1.prototype
if(a.constructor==Array)return J.au.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aw.prototype
return a}if(a instanceof P.a)return a
return J.b6(a)}
J.H=function(a){if(typeof a=="string")return J.aP.prototype
if(a==null)return a
if(a.constructor==Array)return J.au.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aw.prototype
return a}if(a instanceof P.a)return a
return J.b6(a)}
J.bE=function(a){if(a==null)return a
if(a.constructor==Array)return J.au.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aw.prototype
return a}if(a instanceof P.a)return a
return J.b6(a)}
J.hd=function(a){if(typeof a=="number")return J.av.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.aY.prototype
return a}
J.he=function(a){if(typeof a=="number")return J.av.prototype
if(typeof a=="string")return J.aP.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.aY.prototype
return a}
J.a5=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aw.prototype
return a}if(a instanceof P.a)return a
return J.b6(a)}
J.a9=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.he(a).a2(a,b)}
J.V=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.m(a).n(a,b)}
J.dg=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.hd(a).ab(a,b)}
J.bL=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.ht(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.H(a).i(a,b)}
J.dh=function(a,b,c,d){return J.a5(a).bT(a,b,c,d)}
J.di=function(a,b,c,d){return J.a5(a).c9(a,b,c,d)}
J.dj=function(a,b,c){return J.a5(a).ca(a,b,c)}
J.bc=function(a,b,c){return J.H(a).ck(a,b,c)}
J.aH=function(a,b){return J.bE(a).v(a,b)}
J.aq=function(a){return J.a5(a).gK(a)}
J.P=function(a){return J.m(a).gp(a)}
J.aI=function(a){return J.bE(a).gu(a)}
J.aa=function(a){return J.H(a).gj(a)}
J.dk=function(a,b){return J.bE(a).M(a,b)}
J.dl=function(a,b){return J.a5(a).cO(a,b)}
J.Q=function(a){return J.m(a).h(a)}
var $=I.p
C.o=W.dm.prototype
C.c=W.dv.prototype
C.q=J.f.prototype
C.d=J.au.prototype
C.f=J.cb.prototype
C.e=J.cc.prototype
C.a=J.av.prototype
C.h=J.aP.prototype
C.y=J.aw.prototype
C.n=J.eh.prototype
C.j=J.aY.prototype
C.i=W.eL.prototype
C.p=new P.eY()
C.b=new P.fu()
C.k=new P.as(0)
C.r=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.t=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.l=function(hooks) { return hooks; }

C.u=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.v=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.w=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.x=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.m=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
$.cn="$cachedFunction"
$.co="$cachedInvocation"
$.L=0
$.ab=null
$.bQ=null
$.bF=null
$.cX=null
$.da=null
$.b5=null
$.b8=null
$.bG=null
$.a1=null
$.al=null
$.am=null
$.bA=!1
$.l=C.b
$.c3=0
$.bZ=null
$.bY=null
$.bX=null
$.bW=null
$.u=null
$.a8=null
$.aG=null
$.aF=0.2
$.bb=null
$.de=null
$.d7=null
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["bV","$get$bV",function(){return H.d2("_$dart_dartClosure")},"bi","$get$bi",function(){return H.d2("_$dart_js")},"c7","$get$c7",function(){return H.dY()},"c8","$get$c8",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.c3
$.c3=z+1
z="expando$key$"+z}return new P.dG(null,z)},"cx","$get$cx",function(){return H.N(H.aX({
toString:function(){return"$receiver$"}}))},"cy","$get$cy",function(){return H.N(H.aX({$method$:null,
toString:function(){return"$receiver$"}}))},"cz","$get$cz",function(){return H.N(H.aX(null))},"cA","$get$cA",function(){return H.N(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"cE","$get$cE",function(){return H.N(H.aX(void 0))},"cF","$get$cF",function(){return H.N(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"cC","$get$cC",function(){return H.N(H.cD(null))},"cB","$get$cB",function(){return H.N(function(){try{null.$method$}catch(z){return z.message}}())},"cH","$get$cH",function(){return H.N(H.cD(void 0))},"cG","$get$cG",function(){return H.N(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bv","$get$bv",function(){return P.eN()},"aN","$get$aN",function(){var z,y
z=P.aT
y=new P.a_(0,P.eM(),null,[z])
y.bR(null,z)
return y},"ao","$get$ao",function(){return[]},"bU","$get$bU",function(){return{}},"C","$get$C",function(){return H.t([],[W.bS])},"b4","$get$b4",function(){return H.t([],[P.G])},"aB","$get$aB",function(){return H.t([],[P.G])},"aD","$get$aD",function(){return H.t([],[P.G])},"aC","$get$aC",function(){return H.t([],[P.G])},"b3","$get$b3",function(){return H.t([],[W.dL])},"bD","$get$bD",function(){return P.c0(0,0,0,250,0,0)},"bH","$get$bH",function(){return P.dz()}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1,args:[,]},{func:1},{func:1,v:true},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.a],opt:[P.ay]},{func:1,ret:P.Z,args:[P.j]},{func:1,args:[,P.Z]},{func:1,args:[P.Z]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,],opt:[,]},{func:1,v:true,args:[,P.ay]},{func:1,args:[,,]},{func:1,v:true,args:[P.a]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.hI(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.w=a.w
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dc(F.d6(),b)},[])
else (function(b){H.dc(F.d6(),b)})([])})})()