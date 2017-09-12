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
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$ise)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bH"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bH"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bH(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.y=function(){}
var dart=[["","",,H,{"^":"",i9:{"^":"a;a"}}],["","",,J,{"^":"",
m:function(a){return void 0},
bb:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
b8:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.bK==null){H.hc()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(new P.cK("Return interceptor for "+H.c(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$bm()]
if(v!=null)return v
v=H.hm(a)
if(v!=null)return v
if(typeof a=="function")return C.w
y=Object.getPrototypeOf(a)
if(y==null)return C.m
if(y===Object.prototype)return C.m
if(typeof w=="function"){Object.defineProperty(w,$.$get$bm(),{value:C.i,enumerable:false,writable:true,configurable:true})
return C.i}return C.i},
e:{"^":"a;",
n:function(a,b){return a===b},
gp:function(a){return H.W(a)},
h:["bJ",function(a){return H.aS(a)}],
"%":"Blob|CanvasRenderingContext2D|Client|DOMError|File|FileError|MediaError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|Screen|WindowClient"},
e1:{"^":"e;",
h:function(a){return String(a)},
gp:function(a){return a?519018:218159},
$isfQ:1},
e2:{"^":"e;",
n:function(a,b){return null==b},
h:function(a){return"null"},
gp:function(a){return 0}},
bn:{"^":"e;",
gp:function(a){return 0},
h:["bK",function(a){return String(a)}],
$ise3:1},
eh:{"^":"bn;"},
aW:{"^":"bn;"},
aw:{"^":"bn;",
h:function(a){var z=a[$.$get$bX()]
return z==null?this.bK(a):J.S(z)},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
au:{"^":"e;$ti",
bd:function(a,b){if(!!a.immutable$list)throw H.d(new P.B(b))},
ci:function(a,b){if(!!a.fixed$length)throw H.d(new P.B(b))},
L:function(a,b){return new H.bq(a,b,[H.r(a,0),null])},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
gcr:function(a){if(a.length>0)return a[0]
throw H.d(H.cb())},
aH:function(a,b,c,d,e){var z,y,x
this.bd(a,"setRange")
P.ct(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.p(P.a_(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.d(H.e0())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.b(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.b(d,x)
a[b+y]=d[x]}},
h:function(a){return P.aM(a,"[","]")},
gu:function(a){return new J.bh(a,a.length,0,null)},
gp:function(a){return H.W(a)},
gj:function(a){return a.length},
sj:function(a,b){this.ci(a,"set length")
if(b<0)throw H.d(P.a_(b,0,null,"newLength",null))
a.length=b},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.o(a,b))
if(b>=a.length||b<0)throw H.d(H.o(a,b))
return a[b]},
t:function(a,b,c){this.bd(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.o(a,b))
if(b>=a.length||b<0)throw H.d(H.o(a,b))
a[b]=c},
$isz:1,
$asz:I.y,
$isi:1,
$asi:null,
$ish:1,
$ash:null},
i8:{"^":"au;$ti"},
bh:{"^":"a;a,b,c,d",
gm:function(){return this.d},
l:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(H.df(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
av:{"^":"e;",
aG:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.d(new P.B(""+a+".toInt()"))},
R:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.d(new P.B(""+a+".round()"))},
h:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gp:function(a){return a&0x1FFFFFFF},
a2:function(a,b){if(typeof b!=="number")throw H.d(H.a5(b))
return a+b},
H:function(a,b){return(a|0)===a?a/b|0:this.cc(a,b)},
cc:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.d(new P.B("Result of truncating division is "+H.c(z)+": "+H.c(a)+" ~/ "+b))},
ax:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ab:function(a,b){if(typeof b!=="number")throw H.d(H.a5(b))
return a<b},
$isaC:1},
ce:{"^":"av;",$isaC:1,$isj:1},
cd:{"^":"av;",$isaC:1},
aN:{"^":"e;",
be:function(a,b){if(b<0)throw H.d(H.o(a,b))
if(b>=a.length)H.p(H.o(a,b))
return a.charCodeAt(b)},
ak:function(a,b){if(b>=a.length)throw H.d(H.o(a,b))
return a.charCodeAt(b)},
a2:function(a,b){if(typeof b!=="string")throw H.d(P.bR(b,null,null))
return a+b},
ad:function(a,b,c){if(c==null)c=a.length
H.h1(c)
if(b<0)throw H.d(P.aT(b,null,null))
if(typeof c!=="number")return H.P(c)
if(b>c)throw H.d(P.aT(b,null,null))
if(c>a.length)throw H.d(P.aT(c,null,null))
return a.substring(b,c)},
bI:function(a,b){return this.ad(a,b,null)},
cT:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.ak(z,0)===133){x=J.e4(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.be(z,w)===133?J.e5(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
ck:function(a,b,c){if(c>a.length)throw H.d(P.a_(c,0,a.length,null,null))
return H.hy(a,b,c)},
h:function(a){return a},
gp:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gj:function(a){return a.length},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.o(a,b))
if(b>=a.length||b<0)throw H.d(H.o(a,b))
return a[b]},
$isz:1,
$asz:I.y,
$isa0:1,
k:{
cf:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
e4:function(a,b){var z,y
for(z=a.length;b<z;){y=C.f.ak(a,b)
if(y!==32&&y!==13&&!J.cf(y))break;++b}return b},
e5:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.f.be(a,z)
if(y!==32&&y!==13&&!J.cf(y))break}return b}}}}],["","",,H,{"^":"",
cb:function(){return new P.bx("No element")},
e0:function(){return new P.bx("Too few elements")},
h:{"^":"L;$ti",$ash:null},
ax:{"^":"h;$ti",
gu:function(a){return new H.cg(this,this.gj(this),0,null)},
L:function(a,b){return new H.bq(this,b,[H.q(this,"ax",0),null])},
a0:function(a,b){var z,y,x
z=H.t([],[H.q(this,"ax",0)])
C.c.sj(z,this.gj(this))
for(y=0;y<this.gj(this);++y){x=this.w(0,y)
if(y>=z.length)return H.b(z,y)
z[y]=x}return z},
a_:function(a){return this.a0(a,!0)}},
cg:{"^":"a;a,b,c,d",
gm:function(){return this.d},
l:function(){var z,y,x,w
z=this.a
y=J.J(z)
x=y.gj(z)
if(this.b!==x)throw H.d(new P.ac(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.w(z,w);++this.c
return!0}},
aP:{"^":"L;a,b,$ti",
gu:function(a){return new H.ed(null,J.aG(this.a),this.b,this.$ti)},
gj:function(a){return J.aa(this.a)},
w:function(a,b){return this.b.$1(J.aF(this.a,b))},
$asL:function(a,b){return[b]},
k:{
aQ:function(a,b,c,d){if(!!a.$ish)return new H.c3(a,b,[c,d])
return new H.aP(a,b,[c,d])}}},
c3:{"^":"aP;a,b,$ti",$ish:1,
$ash:function(a,b){return[b]}},
ed:{"^":"cc;a,b,c,$ti",
l:function(){var z=this.b
if(z.l()){this.a=this.c.$1(z.gm())
return!0}this.a=null
return!1},
gm:function(){return this.a}},
bq:{"^":"ax;a,b,$ti",
gj:function(a){return J.aa(this.a)},
w:function(a,b){return this.b.$1(J.aF(this.a,b))},
$asax:function(a,b){return[b]},
$ash:function(a,b){return[b]},
$asL:function(a,b){return[b]}},
eJ:{"^":"L;a,b,$ti",
gu:function(a){return new H.eK(J.aG(this.a),this.b,this.$ti)},
L:function(a,b){return new H.aP(this,b,[H.r(this,0),null])}},
eK:{"^":"cc;a,b,$ti",
l:function(){var z,y
for(z=this.a,y=this.b;z.l();)if(y.$1(z.gm())===!0)return!0
return!1},
gm:function(){return this.a.gm()}},
c6:{"^":"a;$ti"}}],["","",,H,{"^":"",
aA:function(a,b){var z=a.U(b)
if(!init.globalState.d.cy)init.globalState.f.Z()
return z},
de:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.m(y).$isi)throw H.d(P.bP("Arguments to main must be a List: "+H.c(y)))
init.globalState=new H.fl(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$c9()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.eY(P.bp(null,H.az),0)
x=P.j
y.z=new H.Z(0,null,null,null,null,null,0,[x,H.bC])
y.ch=new H.Z(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.fk()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.dU,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.fm)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.ag(null,null,null,x)
v=new H.aU(0,null,!1)
u=new H.bC(y,new H.Z(0,null,null,null,null,null,0,[x,H.aU]),w,init.createNewIsolate(),v,new H.Y(H.bd()),new H.Y(H.bd()),!1,!1,[],P.ag(null,null,null,null),null,null,!1,!0,P.ag(null,null,null,null))
w.C(0,0)
u.aK(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.a6(a,{func:1,args:[,]}))u.U(new H.hw(z,a))
else if(H.a6(a,{func:1,args:[,,]}))u.U(new H.hx(z,a))
else u.U(a)
init.globalState.f.Z()},
dY:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.dZ()
return},
dZ:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.d(new P.B("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.d(new P.B('Cannot extract URI from "'+z+'"'))},
dU:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.aY(!0,[]).I(b.data)
y=J.J(z)
switch(y.i(z,"command")){case"start":init.globalState.b=y.i(z,"id")
x=y.i(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.i(z,"args")
u=new H.aY(!0,[]).I(y.i(z,"msg"))
t=y.i(z,"isSpawnUri")
s=y.i(z,"startPaused")
r=new H.aY(!0,[]).I(y.i(z,"replyTo"))
y=init.globalState.a++
q=P.j
p=P.ag(null,null,null,q)
o=new H.aU(0,null,!1)
n=new H.bC(y,new H.Z(0,null,null,null,null,null,0,[q,H.aU]),p,init.createNewIsolate(),o,new H.Y(H.bd()),new H.Y(H.bd()),!1,!1,[],P.ag(null,null,null,null),null,null,!1,!0,P.ag(null,null,null,null))
p.C(0,0)
n.aK(0,o)
init.globalState.f.a.E(new H.az(n,new H.dV(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.Z()
break
case"spawn-worker":break
case"message":if(y.i(z,"port")!=null)y.i(z,"port").G(y.i(z,"msg"))
init.globalState.f.Z()
break
case"close":init.globalState.ch.Y(0,$.$get$ca().i(0,a))
a.terminate()
init.globalState.f.Z()
break
case"log":H.dT(y.i(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.af(["command","print","msg",z])
q=new H.a2(!0,P.ak(null,P.j)).B(q)
y.toString
self.postMessage(q)}else P.bc(y.i(z,"msg"))
break
case"error":throw H.d(y.i(z,"msg"))}},
dT:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.af(["command","log","msg",a])
x=new H.a2(!0,P.ak(null,P.j)).B(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.G(w)
z=H.K(w)
y=P.aK(z)
throw H.d(y)}},
dW:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cp=$.cp+("_"+y)
$.cq=$.cq+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.G(["spawned",new H.b0(y,x),w,z.r])
x=new H.dX(a,b,c,d,z)
if(e===!0){z.bb(w,w)
init.globalState.f.a.E(new H.az(z,x,"start isolate"))}else x.$0()},
fy:function(a){return new H.aY(!0,[]).I(new H.a2(!1,P.ak(null,P.j)).B(a))},
hw:{"^":"f:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
hx:{"^":"f:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
fl:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",k:{
fm:function(a){var z=P.af(["command","print","msg",a])
return new H.a2(!0,P.ak(null,P.j)).B(z)}}},
bC:{"^":"a;a,b,c,cG:d<,cl:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bb:function(a,b){if(!this.f.n(0,a))return
if(this.Q.C(0,b)&&!this.y)this.y=!0
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
if(w===y.c)y.aS();++y.d}this.y=!1}this.ay()},
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
if(typeof z!=="object"||z===null||!!z.fixed$length)H.p(new P.B("removeRange"))
P.ct(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
bG:function(a,b){if(!this.r.n(0,a))return
this.db=b},
cv:function(a,b,c){var z=J.m(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){a.G(c)
return}z=this.cx
if(z==null){z=P.bp(null,null)
this.cx=z}z.E(new H.ff(a,c))},
cu:function(a,b){var z
if(!this.r.n(0,a))return
z=J.m(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){this.aB()
return}z=this.cx
if(z==null){z=P.bp(null,null)
this.cx=z}z.E(this.gcH())},
cw:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.bc(a)
if(b!=null)P.bc(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.S(a)
y[1]=b==null?null:J.S(b)
for(x=new P.bD(z,z.r,null,null),x.c=z.e;x.l();)x.d.G(y)},
U:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.G(u)
v=H.K(u)
this.cw(w,v)
if(this.db===!0){this.aB()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gcG()
if(this.cx!=null)for(;t=this.cx,!t.gF(t);)this.cx.bn().$0()}return y},
bl:function(a){return this.b.i(0,a)},
aK:function(a,b){var z=this.b
if(z.bf(a))throw H.d(P.aK("Registry: ports must be registered only once."))
z.t(0,a,b)},
ay:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.t(0,this.a,this)
else this.aB()},
aB:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.N(0)
for(z=this.b,y=z.gbu(z),y=y.gu(y);y.l();)y.gm().bW()
z.N(0)
this.c.N(0)
init.globalState.z.Y(0,this.a)
this.dx.N(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.b(z,v)
w.G(z[v])}this.ch=null}},"$0","gcH",0,0,2]},
ff:{"^":"f:2;a,b",
$0:function(){this.a.G(this.b)}},
eY:{"^":"a;a,b",
cm:function(){var z=this.a
if(z.b===z.c)return
return z.bn()},
br:function(){var z,y,x
z=this.cm()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.bf(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gF(y)}else y=!1
else y=!1
else y=!1
if(y)H.p(P.aK("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gF(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.af(["command","close"])
x=new H.a2(!0,new P.cS(0,null,null,null,null,null,0,[null,P.j])).B(x)
y.toString
self.postMessage(x)}return!1}z.cK()
return!0},
b3:function(){if(self.window!=null)new H.eZ(this).$0()
else for(;this.br(););},
Z:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.b3()
else try{this.b3()}catch(x){z=H.G(x)
y=H.K(x)
w=init.globalState.Q
v=P.af(["command","error","msg",H.c(z)+"\n"+H.c(y)])
v=new H.a2(!0,P.ak(null,P.j)).B(v)
w.toString
self.postMessage(v)}}},
eZ:{"^":"f:2;a",
$0:function(){if(!this.a.br())return
P.cy(C.j,this)}},
az:{"^":"a;a,b,c",
cK:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.U(this.b)}},
fk:{"^":"a;"},
dV:{"^":"f:1;a,b,c,d,e,f",
$0:function(){H.dW(this.a,this.b,this.c,this.d,this.e,this.f)}},
dX:{"^":"f:2;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.a6(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.a6(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.ay()}},
cM:{"^":"a;"},
b0:{"^":"cM;b,a",
G:function(a){var z,y,x
z=init.globalState.z.i(0,this.a)
if(z==null)return
y=this.b
if(y.gaV())return
x=H.fy(a)
if(z.gcl()===y){y=J.J(x)
switch(y.i(x,0)){case"pause":z.bb(y.i(x,1),y.i(x,2))
break
case"resume":z.cN(y.i(x,1))
break
case"add-ondone":z.cf(y.i(x,1),y.i(x,2))
break
case"remove-ondone":z.cM(y.i(x,1))
break
case"set-errors-fatal":z.bG(y.i(x,1),y.i(x,2))
break
case"ping":z.cv(y.i(x,1),y.i(x,2),y.i(x,3))
break
case"kill":z.cu(y.i(x,1),y.i(x,2))
break
case"getErrors":y=y.i(x,1)
z.dx.C(0,y)
break
case"stopErrors":y=y.i(x,1)
z.dx.Y(0,y)
break}return}init.globalState.f.a.E(new H.az(z,new H.fo(this,x),"receive"))},
n:function(a,b){if(b==null)return!1
return b instanceof H.b0&&J.X(this.b,b.b)},
gp:function(a){return this.b.gaq()}},
fo:{"^":"f:1;a,b",
$0:function(){var z=this.a.b
if(!z.gaV())z.bT(this.b)}},
bE:{"^":"cM;b,c,a",
G:function(a){var z,y,x
z=P.af(["command","message","port",this,"msg",a])
y=new H.a2(!0,P.ak(null,P.j)).B(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.i(0,this.b)
if(x!=null)x.postMessage(y)}},
n:function(a,b){if(b==null)return!1
return b instanceof H.bE&&J.X(this.b,b.b)&&J.X(this.a,b.a)&&J.X(this.c,b.c)},
gp:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.bH()
y=this.a
if(typeof y!=="number")return y.bH()
x=this.c
if(typeof x!=="number")return H.P(x)
return(z<<16^y<<8^x)>>>0}},
aU:{"^":"a;aq:a<,b,aV:c<",
bW:function(){this.c=!0
this.b=null},
bT:function(a){if(this.c)return
this.b.$1(a)},
$iseq:1},
eD:{"^":"a;a,b,c",
a9:function(){if(self.setTimeout!=null){if(this.b)throw H.d(new P.B("Timer in event loop cannot be canceled."))
var z=this.c
if(z==null)return;--init.globalState.f.b
self.clearTimeout(z)
this.c=null}else throw H.d(new P.B("Canceling a timer."))},
bO:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.E(new H.az(y,new H.eF(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ap(new H.eG(this,b),0),a)}else throw H.d(new P.B("Timer greater than 0."))},
k:{
eE:function(a,b){var z=new H.eD(!0,!1,null)
z.bO(a,b)
return z}}},
eF:{"^":"f:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
eG:{"^":"f:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
Y:{"^":"a;aq:a<",
gp:function(a){var z=this.a
if(typeof z!=="number")return z.cW()
z=C.a.ax(z,0)^C.a.H(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
n:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.Y){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
a2:{"^":"a;a,b",
B:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.i(0,a)
if(y!=null)return["ref",y]
z.t(0,a,z.gj(z))
z=J.m(a)
if(!!z.$isch)return["buffer",a]
if(!!z.$isbu)return["typed",a]
if(!!z.$isz)return this.bC(a)
if(!!z.$isdS){x=this.gbz()
w=a.gbj()
w=H.aQ(w,x,H.q(w,"L",0),null)
w=P.aO(w,!0,H.q(w,"L",0))
z=z.gbu(a)
z=H.aQ(z,x,H.q(z,"L",0),null)
return["map",w,P.aO(z,!0,H.q(z,"L",0))]}if(!!z.$ise3)return this.bD(a)
if(!!z.$ise)this.bt(a)
if(!!z.$iseq)this.a1(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isb0)return this.bE(a)
if(!!z.$isbE)return this.bF(a)
if(!!z.$isf){v=a.$static_name
if(v==null)this.a1(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isY)return["capability",a.a]
if(!(a instanceof P.a))this.bt(a)
return["dart",init.classIdExtractor(a),this.bB(init.classFieldsExtractor(a))]},"$1","gbz",2,0,0],
a1:function(a,b){throw H.d(new P.B((b==null?"Can't transmit:":b)+" "+H.c(a)))},
bt:function(a){return this.a1(a,null)},
bC:function(a){var z=this.bA(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.a1(a,"Can't serialize indexable: ")},
bA:function(a){var z,y,x
z=[]
C.c.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.B(a[y])
if(y>=z.length)return H.b(z,y)
z[y]=x}return z},
bB:function(a){var z
for(z=0;z<a.length;++z)C.c.t(a,z,this.B(a[z]))
return a},
bD:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.a1(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.B(a[z[x]])
if(x>=y.length)return H.b(y,x)
y[x]=w}return["js-object",z,y]},
bF:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
bE:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaq()]
return["raw sendport",a]}},
aY:{"^":"a;a,b",
I:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.d(P.bP("Bad serialized message: "+H.c(a)))
switch(C.c.gcr(a)){case"ref":if(1>=a.length)return H.b(a,1)
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
y=H.t(this.T(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return H.t(this.T(x),[null])
case"mutable":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return this.T(x)
case"const":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
y=H.t(this.T(x),[null])
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
return new H.Y(a[1])
case"dart":y=a.length
if(1>=y)return H.b(a,1)
w=a[1]
if(2>=y)return H.b(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.T(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.d("couldn't deserialize: "+H.c(a))}},"$1","gcn",2,0,0],
T:function(a){var z,y,x
z=J.J(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.P(x)
if(!(y<x))break
z.t(a,y,this.I(z.i(a,y)));++y}return a},
cp:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.b(a,1)
y=a[1]
if(2>=z)return H.b(a,2)
x=a[2]
w=P.eb()
this.b.push(w)
y=J.dm(y,this.gcn()).a_(0)
for(z=J.J(y),v=J.J(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.b(y,u)
w.t(0,y[u],this.I(v.i(x,u)))}return w},
cq:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.b(a,1)
y=a[1]
if(2>=z)return H.b(a,2)
x=a[2]
if(3>=z)return H.b(a,3)
w=a[3]
if(J.X(y,init.globalState.b)){v=init.globalState.z.i(0,x)
if(v==null)return
u=v.bl(w)
if(u==null)return
t=new H.b0(u,x)}else t=new H.bE(y,w,x)
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
z=J.J(y)
v=J.J(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.P(t)
if(!(u<t))break
w[z.i(y,u)]=this.I(v.i(x,u));++u}return w}}}],["","",,H,{"^":"",
h7:function(a){return init.types[a]},
hl:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.m(a).$isH},
c:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.S(a)
if(typeof z!=="string")throw H.d(H.a5(a))
return z},
W:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
co:function(a,b){throw H.d(new P.dK("Invalid double",a,null))},
ep:function(a,b){var z,y
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return H.co(a,b)
z=parseFloat(a)
if(isNaN(z)){y=C.f.cT(a)
if(y==="NaN"||y==="+NaN"||y==="-NaN")return z
return H.co(a,b)}return z},
bw:function(a){var z,y,x,w,v,u,t,s
z=J.m(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.o||!!J.m(a).$isaW){v=C.l(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.f.ak(w,0)===36)w=C.f.bI(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.d7(H.b9(a),0,null),init.mangledGlobalNames)},
aS:function(a){return"Instance of '"+H.bw(a)+"'"},
A:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
eo:function(a){return a.b?H.A(a).getUTCFullYear()+0:H.A(a).getFullYear()+0},
em:function(a){return a.b?H.A(a).getUTCMonth()+1:H.A(a).getMonth()+1},
ei:function(a){return a.b?H.A(a).getUTCDate()+0:H.A(a).getDate()+0},
ej:function(a){return a.b?H.A(a).getUTCHours()+0:H.A(a).getHours()+0},
el:function(a){return a.b?H.A(a).getUTCMinutes()+0:H.A(a).getMinutes()+0},
en:function(a){return a.b?H.A(a).getUTCSeconds()+0:H.A(a).getSeconds()+0},
ek:function(a){return a.b?H.A(a).getUTCMilliseconds()+0:H.A(a).getMilliseconds()+0},
bv:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.a5(a))
return a[b]},
cr:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.a5(a))
a[b]=c},
P:function(a){throw H.d(H.a5(a))},
b:function(a,b){if(a==null)J.aa(a)
throw H.d(H.o(a,b))},
o:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.T(!0,b,"index",null)
z=J.aa(a)
if(!(b<0)){if(typeof z!=="number")return H.P(z)
y=b>=z}else y=!0
if(y)return P.ae(b,a,"index",null,z)
return P.aT(b,"index",null)},
a5:function(a){return new P.T(!0,a,null,null)},
I:function(a){return a},
h1:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.d(H.a5(a))
return a},
d:function(a){var z
if(a==null)a=new P.cn()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dh})
z.name=""}else z.toString=H.dh
return z},
dh:function(){return J.S(this.dartException)},
p:function(a){throw H.d(a)},
df:function(a){throw H.d(new P.ac(a))},
G:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.hB(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.ax(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bo(H.c(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.c(y)+" (Error "+w+")"
return z.$1(new H.cm(v,null))}}if(a instanceof TypeError){u=$.$get$cz()
t=$.$get$cA()
s=$.$get$cB()
r=$.$get$cC()
q=$.$get$cG()
p=$.$get$cH()
o=$.$get$cE()
$.$get$cD()
n=$.$get$cJ()
m=$.$get$cI()
l=u.D(y)
if(l!=null)return z.$1(H.bo(y,l))
else{l=t.D(y)
if(l!=null){l.method="call"
return z.$1(H.bo(y,l))}else{l=s.D(y)
if(l==null){l=r.D(y)
if(l==null){l=q.D(y)
if(l==null){l=p.D(y)
if(l==null){l=o.D(y)
if(l==null){l=r.D(y)
if(l==null){l=n.D(y)
if(l==null){l=m.D(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cm(y,l==null?null:l.method))}}return z.$1(new H.eI(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cv()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.T(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cv()
return a},
K:function(a){var z
if(a==null)return new H.cT(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.cT(a,null)},
hs:function(a){if(a==null||typeof a!='object')return J.R(a)
else return H.W(a)},
h4:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.t(0,a[y],a[x])}return b},
hf:function(a,b,c,d,e,f,g){switch(c){case 0:return H.aA(b,new H.hg(a))
case 1:return H.aA(b,new H.hh(a,d))
case 2:return H.aA(b,new H.hi(a,d,e))
case 3:return H.aA(b,new H.hj(a,d,e,f))
case 4:return H.aA(b,new H.hk(a,d,e,f,g))}throw H.d(P.aK("Unsupported number of arguments for wrapped closure"))},
ap:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.hf)
a.$identity=z
return z},
dv:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.m(c).$isi){z.$reflectionInfo=c
x=H.es(z).r}else x=c
w=d?Object.create(new H.ew().constructor.prototype):Object.create(new H.bi(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.N
$.N=J.a9(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.bV(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.h7,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.bT:H.bj
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.d("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.bV(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
ds:function(a,b,c,d){var z=H.bj
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
bV:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.du(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ds(y,!w,z,b)
if(y===0){w=$.N
$.N=J.a9(w,1)
u="self"+H.c(w)
w="return function(){var "+u+" = this."
v=$.ab
if(v==null){v=H.aI("self")
$.ab=v}return new Function(w+H.c(v)+";return "+u+"."+H.c(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.N
$.N=J.a9(w,1)
t+=H.c(w)
w="return function("+t+"){return this."
v=$.ab
if(v==null){v=H.aI("self")
$.ab=v}return new Function(w+H.c(v)+"."+H.c(z)+"("+t+");}")()},
dt:function(a,b,c,d){var z,y
z=H.bj
y=H.bT
switch(b?-1:a){case 0:throw H.d(new H.et("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
du:function(a,b){var z,y,x,w,v,u,t,s
z=H.dp()
y=$.bS
if(y==null){y=H.aI("receiver")
$.bS=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.dt(w,!u,x,b)
if(w===1){y="return function(){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+");"
u=$.N
$.N=J.a9(u,1)
return new Function(y+H.c(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+", "+s+");"
u=$.N
$.N=J.a9(u,1)
return new Function(y+H.c(u)+"}")()},
bH:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.m(c).$isi){c.fixed$length=Array
z=c}else z=c
return H.dv(a,b,z,!!d,e,f)},
hu:function(a,b){var z=J.J(b)
throw H.d(H.dr(H.bw(a),z.ad(b,3,z.gj(b))))},
he:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.m(a)[b]
else z=!0
if(z)return a
H.hu(a,b)},
h2:function(a){var z=J.m(a)
return"$S" in z?z.$S():null},
a6:function(a,b){var z
if(a==null)return!1
z=H.h2(a)
return z==null?!1:H.d6(z,b)},
hA:function(a){throw H.d(new P.dz(a))},
bd:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
d4:function(a){return init.getIsolateTag(a)},
t:function(a,b){a.$ti=b
return a},
b9:function(a){if(a==null)return
return a.$ti},
d5:function(a,b){return H.bN(a["$as"+H.c(b)],H.b9(a))},
q:function(a,b,c){var z=H.d5(a,b)
return z==null?null:z[c]},
r:function(a,b){var z=H.b9(a)
return z==null?null:z[b]},
a7:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.d7(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.c(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.a7(z,b)
return H.fz(a,b)}return"unknown-reified-type"},
fz:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.a7(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.a7(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.a7(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.h3(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.a7(r[p],b)+(" "+H.c(p))}w+="}"}return"("+w+") => "+z},
d7:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.by("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.q=v+", "
u=a[y]
if(u!=null)w=!1
v=z.q+=H.a7(u,c)}return w?"":"<"+z.h(0)+">"},
bN:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
d2:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.b9(a)
y=J.m(a)
if(y[b]==null)return!1
return H.d0(H.bN(y[d],z),c)},
d0:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.F(a[y],b[y]))return!1
return!0},
d3:function(a,b,c){return a.apply(b,H.d5(b,c))},
F:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="aR")return!0
if('func' in b)return H.d6(a,b)
if('func' in a)return b.builtin$cls==="i3"||b.builtin$cls==="a"
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
return H.d0(H.bN(u,z),x)},
d_:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.F(z,v)||H.F(v,z)))return!1}return!0},
fJ:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.F(v,u)||H.F(u,v)))return!1}return!0},
d6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.F(z,y)||H.F(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.d_(x,w,!1))return!1
if(!H.d_(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.F(o,n)||H.F(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.F(o,n)||H.F(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.F(o,n)||H.F(n,o)))return!1}}return H.fJ(a.named,b.named)},
iV:function(a){var z=$.bJ
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
iS:function(a){return H.W(a)},
iR:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
hm:function(a){var z,y,x,w,v,u
z=$.bJ.$1(a)
y=$.b6[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.ba[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.cZ.$2(a,z)
if(z!=null){y=$.b6[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.ba[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bM(x)
$.b6[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.ba[z]=x
return x}if(v==="-"){u=H.bM(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.da(a,x)
if(v==="*")throw H.d(new P.cK(z))
if(init.leafTags[z]===true){u=H.bM(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.da(a,x)},
da:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bb(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bM:function(a){return J.bb(a,!1,null,!!a.$isH)},
hr:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bb(z,!1,null,!!z.$isH)
else return J.bb(z,c,null,null)},
hc:function(){if(!0===$.bK)return
$.bK=!0
H.hd()},
hd:function(){var z,y,x,w,v,u,t,s
$.b6=Object.create(null)
$.ba=Object.create(null)
H.h8()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dc.$1(v)
if(u!=null){t=H.hr(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
h8:function(){var z,y,x,w,v,u,t
z=C.t()
z=H.a4(C.p,H.a4(C.v,H.a4(C.k,H.a4(C.k,H.a4(C.u,H.a4(C.q,H.a4(C.r(C.l),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bJ=new H.h9(v)
$.cZ=new H.ha(u)
$.dc=new H.hb(t)},
a4:function(a,b){return a(b)||b},
hy:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
hz:function(a,b,c){var z,y,x
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
D:function(a){var z,y,x
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
O:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.eH(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
aV:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
cF:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cm:{"^":"v;a,b",
h:function(a){var z=this.b
if(z==null)return"NullError: "+H.c(this.a)
return"NullError: method not found: '"+H.c(z)+"' on null"}},
e7:{"^":"v;a,b,c",
h:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.c(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.c(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.c(this.a)+")"},
k:{
bo:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.e7(a,y,z?null:b.receiver)}}},
eI:{"^":"v;a",
h:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
hB:{"^":"f:0;a",
$1:function(a){if(!!J.m(a).$isv)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
cT:{"^":"a;a,b",
h:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
hg:{"^":"f:1;a",
$0:function(){return this.a.$0()}},
hh:{"^":"f:1;a,b",
$0:function(){return this.a.$1(this.b)}},
hi:{"^":"f:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
hj:{"^":"f:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
hk:{"^":"f:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
f:{"^":"a;",
h:function(a){return"Closure '"+H.bw(this).trim()+"'"},
gbw:function(){return this},
gbw:function(){return this}},
cx:{"^":"f;"},
ew:{"^":"cx;",
h:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bi:{"^":"cx;a,b,c,d",
n:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bi))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gp:function(a){var z,y
z=this.c
if(z==null)y=H.W(this.a)
else y=typeof z!=="object"?J.R(z):H.W(z)
z=H.W(this.b)
if(typeof y!=="number")return y.cX()
return(y^z)>>>0},
h:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.c(this.d)+"' of "+H.aS(z)},
k:{
bj:function(a){return a.a},
bT:function(a){return a.c},
dp:function(){var z=$.ab
if(z==null){z=H.aI("self")
$.ab=z}return z},
aI:function(a){var z,y,x,w,v
z=new H.bi("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
dq:{"^":"v;a",
h:function(a){return this.a},
k:{
dr:function(a,b){return new H.dq("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
et:{"^":"v;a",
h:function(a){return"RuntimeError: "+H.c(this.a)}},
Z:{"^":"a;a,b,c,d,e,f,r,$ti",
gj:function(a){return this.a},
gF:function(a){return this.a===0},
gbj:function(){return new H.e9(this,[H.r(this,0)])},
gbu:function(a){return H.aQ(this.gbj(),new H.e6(this),H.r(this,0),H.r(this,1))},
bf:function(a){var z
if((a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.bZ(z,a)}else return this.cD(a)},
cD:function(a){var z=this.d
if(z==null)return!1
return this.W(this.a5(z,this.V(a)),a)>=0},
i:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.S(z,b)
return y==null?null:y.gK()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.S(x,b)
return y==null?null:y.gK()}else return this.cE(b)},
cE:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.a5(z,this.V(a))
x=this.W(y,a)
if(x<0)return
return y[x].gK()},
t:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.as()
this.b=z}this.aJ(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.as()
this.c=y}this.aJ(y,b,c)}else{x=this.d
if(x==null){x=this.as()
this.d=x}w=this.V(b)
v=this.a5(x,w)
if(v==null)this.aw(x,w,[this.at(b,c)])
else{u=this.W(v,b)
if(u>=0)v[u].sK(c)
else v.push(this.at(b,c))}}},
Y:function(a,b){if(typeof b==="string")return this.b2(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.b2(this.c,b)
else return this.cF(b)},
cF:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.a5(z,this.V(a))
x=this.W(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.b9(w)
return w.gK()},
N:function(a){if(this.a>0){this.f=null
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
if(y!==this.r)throw H.d(new P.ac(this))
z=z.c}},
aJ:function(a,b,c){var z=this.S(a,b)
if(z==null)this.aw(a,b,this.at(b,c))
else z.sK(c)},
b2:function(a,b){var z
if(a==null)return
z=this.S(a,b)
if(z==null)return
this.b9(z)
this.aQ(a,b)
return z.gK()},
at:function(a,b){var z,y
z=new H.e8(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
b9:function(a){var z,y
z=a.gc7()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
V:function(a){return J.R(a)&0x3ffffff},
W:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.X(a[y].gbi(),b))return y
return-1},
h:function(a){return P.ee(this)},
S:function(a,b){return a[b]},
a5:function(a,b){return a[b]},
aw:function(a,b,c){a[b]=c},
aQ:function(a,b){delete a[b]},
bZ:function(a,b){return this.S(a,b)!=null},
as:function(){var z=Object.create(null)
this.aw(z,"<non-identifier-key>",z)
this.aQ(z,"<non-identifier-key>")
return z},
$isdS:1},
e6:{"^":"f:0;a",
$1:function(a){return this.a.i(0,a)}},
e8:{"^":"a;bi:a<,K:b@,c,c7:d<"},
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
if(this.b!==z.r)throw H.d(new P.ac(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
h9:{"^":"f:0;a",
$1:function(a){return this.a(a)}},
ha:{"^":"f:6;a",
$2:function(a,b){return this.a(a,b)}},
hb:{"^":"f:7;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
h3:function(a){var z=H.t(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
ht:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",ch:{"^":"e;",$isch:1,"%":"ArrayBuffer"},bu:{"^":"e;",$isbu:1,"%":"DataView;ArrayBufferView;bs|ci|ck|bt|cj|cl|V"},bs:{"^":"bu;",
gj:function(a){return a.length},
$isH:1,
$asH:I.y,
$isz:1,
$asz:I.y},bt:{"^":"ck;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
t:function(a,b,c){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
a[b]=c}},ci:{"^":"bs+U;",$asH:I.y,$asz:I.y,
$asi:function(){return[P.Q]},
$ash:function(){return[P.Q]},
$isi:1,
$ish:1},ck:{"^":"ci+c6;",$asH:I.y,$asz:I.y,
$asi:function(){return[P.Q]},
$ash:function(){return[P.Q]}},V:{"^":"cl;",
t:function(a,b,c){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
a[b]=c},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]}},cj:{"^":"bs+U;",$asH:I.y,$asz:I.y,
$asi:function(){return[P.j]},
$ash:function(){return[P.j]},
$isi:1,
$ish:1},cl:{"^":"cj+c6;",$asH:I.y,$asz:I.y,
$asi:function(){return[P.j]},
$ash:function(){return[P.j]}},ie:{"^":"bt;",$isi:1,
$asi:function(){return[P.Q]},
$ish:1,
$ash:function(){return[P.Q]},
"%":"Float32Array"},ig:{"^":"bt;",$isi:1,
$asi:function(){return[P.Q]},
$ish:1,
$ash:function(){return[P.Q]},
"%":"Float64Array"},ih:{"^":"V;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Int16Array"},ii:{"^":"V;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Int32Array"},ij:{"^":"V;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Int8Array"},ik:{"^":"V;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Uint16Array"},il:{"^":"V;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Uint32Array"},im:{"^":"V;",
gj:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"CanvasPixelArray|Uint8ClampedArray"},io:{"^":"V;",
gj:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
eN:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.fK()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ap(new P.eP(z),1)).observe(y,{childList:true})
return new P.eO(z,y,x)}else if(self.setImmediate!=null)return P.fL()
return P.fM()},
iD:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ap(new P.eQ(a),0))},"$1","fK",2,0,3],
iE:[function(a){++init.globalState.f.b
self.setImmediate(H.ap(new P.eR(a),0))},"$1","fL",2,0,3],
iF:[function(a){P.bz(C.j,a)},"$1","fM",2,0,3],
cU:function(a,b){if(H.a6(a,{func:1,args:[P.aR,P.aR]})){b.toString
return a}else{b.toString
return a}},
fB:function(){var z,y
for(;z=$.a3,z!=null;){$.am=null
y=z.b
$.a3=y
if(y==null)$.al=null
z.a.$0()}},
iQ:[function(){$.bF=!0
try{P.fB()}finally{$.am=null
$.bF=!1
if($.a3!=null)$.$get$bA().$1(P.d1())}},"$0","d1",0,0,2],
cY:function(a){var z=new P.cL(a,null)
if($.a3==null){$.al=z
$.a3=z
if(!$.bF)$.$get$bA().$1(P.d1())}else{$.al.b=z
$.al=z}},
fE:function(a){var z,y,x
z=$.a3
if(z==null){P.cY(a)
$.am=$.al
return}y=new P.cL(a,null)
x=$.am
if(x==null){y.b=z
$.am=y
$.a3=y}else{y.b=x.b
x.b=y
$.am=y
if(y.b==null)$.al=y}},
dd:function(a){var z=$.l
if(C.b===z){P.b1(null,null,C.b,a)
return}z.toString
P.b1(null,null,z,z.az(a,!0))},
iO:[function(a){},"$1","fN",2,0,12],
fC:[function(a,b){var z=$.l
z.toString
P.an(null,null,z,a,b)},function(a){return P.fC(a,null)},"$2","$1","fP",2,2,4,0],
iP:[function(){},"$0","fO",0,0,2],
fx:function(a,b,c){$.l.toString
a.ae(b,c)},
cy:function(a,b){var z=$.l
if(z===C.b){z.toString
return P.bz(a,b)}return P.bz(a,z.az(b,!0))},
bz:function(a,b){var z=C.d.H(a.a,1000)
return H.eE(z<0?0:z,b)},
eM:function(){return $.l},
an:function(a,b,c,d,e){var z={}
z.a=d
P.fE(new P.fD(z,e))},
cV:function(a,b,c,d){var z,y
y=$.l
if(y===c)return d.$0()
$.l=c
z=y
try{y=d.$0()
return y}finally{$.l=z}},
cX:function(a,b,c,d,e){var z,y
y=$.l
if(y===c)return d.$1(e)
$.l=c
z=y
try{y=d.$1(e)
return y}finally{$.l=z}},
cW:function(a,b,c,d,e,f){var z,y
y=$.l
if(y===c)return d.$2(e,f)
$.l=c
z=y
try{y=d.$2(e,f)
return y}finally{$.l=z}},
b1:function(a,b,c,d){var z=C.b!==c
if(z)d=c.az(d,!(!z||!1))
P.cY(d)},
eP:{"^":"f:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
eO:{"^":"f:8;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
eQ:{"^":"f:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
eR:{"^":"f:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
cQ:{"^":"a;au:a<,b,c,d,e",
gcd:function(){return this.b.b},
gbh:function(){return(this.c&1)!==0},
gcB:function(){return(this.c&2)!==0},
gbg:function(){return this.c===8},
cz:function(a){return this.b.b.aE(this.d,a)},
cJ:function(a){if(this.c!==6)return!0
return this.b.b.aE(this.d,J.aq(a))},
ct:function(a){var z,y,x
z=this.e
y=J.E(a)
x=this.b.b
if(H.a6(z,{func:1,args:[,,]}))return x.cP(z,y.gJ(a),a.gM())
else return x.aE(z,y.gJ(a))},
cA:function(){return this.b.b.bp(this.d)}},
a1:{"^":"a;a8:a<,b,cb:c<,$ti",
gc5:function(){return this.a===2},
gar:function(){return this.a>=4},
bs:function(a,b){var z,y
z=$.l
if(z!==C.b){z.toString
if(b!=null)b=P.cU(b,z)}y=new P.a1(0,z,null,[null])
this.af(new P.cQ(null,y,b==null?1:3,a,b))
return y},
cR:function(a){return this.bs(a,null)},
bv:function(a){var z,y
z=$.l
y=new P.a1(0,z,null,this.$ti)
if(z!==C.b)z.toString
this.af(new P.cQ(null,y,8,a,null))
return y},
af:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gar()){y.af(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.b1(null,null,z,new P.f4(this,a))}},
b1:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gau()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gar()){v.b1(a)
return}this.a=v.a
this.c=v.c}z.a=this.a7(a)
y=this.b
y.toString
P.b1(null,null,y,new P.f9(z,this))}},
av:function(){var z=this.c
this.c=null
return this.a7(z)},
a7:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gau()
z.a=y}return y},
am:function(a){var z,y
z=this.$ti
if(H.d2(a,"$isad",z,"$asad"))if(H.d2(a,"$isa1",z,null))P.cR(a,this)
else P.f5(a,this)
else{y=this.av()
this.a=4
this.c=a
P.aj(this,y)}},
an:[function(a,b){var z=this.av()
this.a=8
this.c=new P.aH(a,b)
P.aj(this,z)},function(a){return this.an(a,null)},"cY","$2","$1","gaP",2,2,4,0],
bS:function(a,b){this.a=4
this.c=a},
$isad:1,
k:{
f5:function(a,b){var z,y,x
b.a=1
try{a.bs(new P.f6(b),new P.f7(b))}catch(x){z=H.G(x)
y=H.K(x)
P.dd(new P.f8(b,z,y))}},
cR:function(a,b){var z,y,x
for(;a.gc5();)a=a.c
z=a.gar()
y=b.c
if(z){b.c=null
x=b.a7(y)
b.a=a.a
b.c=a.c
P.aj(b,x)}else{b.a=2
b.c=a
a.b1(y)}},
aj:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=J.aq(v)
t=v.gM()
y.toString
P.an(null,null,y,u,t)}return}for(;b.gau()!=null;b=s){s=b.a
b.a=null
P.aj(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gbh()||b.gbg()){q=b.gcd()
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
t=v.gM()
y.toString
P.an(null,null,y,u,t)
return}p=$.l
if(p==null?q!=null:p!==q)$.l=q
else p=null
if(b.gbg())new P.fc(z,x,w,b).$0()
else if(y){if(b.gbh())new P.fb(x,b,r).$0()}else if(b.gcB())new P.fa(z,x,b).$0()
if(p!=null)$.l=p
y=x.b
if(!!J.m(y).$isad){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.a7(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.cR(y,o)
return}}o=b.b
b=o.av()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
f4:{"^":"f:1;a,b",
$0:function(){P.aj(this.a,this.b)}},
f9:{"^":"f:1;a,b",
$0:function(){P.aj(this.b,this.a.a)}},
f6:{"^":"f:0;a",
$1:function(a){var z=this.a
z.a=0
z.am(a)}},
f7:{"^":"f:9;a",
$2:function(a,b){this.a.an(a,b)},
$1:function(a){return this.$2(a,null)}},
f8:{"^":"f:1;a,b,c",
$0:function(){this.a.an(this.b,this.c)}},
fc:{"^":"f:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.cA()}catch(w){y=H.G(w)
x=H.K(w)
if(this.c){v=J.aq(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.aH(y,x)
u.a=!0
return}if(!!J.m(z).$isad){if(z instanceof P.a1&&z.ga8()>=4){if(z.ga8()===8){v=this.b
v.b=z.gcb()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.cR(new P.fd(t))
v.a=!1}}},
fd:{"^":"f:0;a",
$1:function(a){return this.a}},
fb:{"^":"f:2;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.cz(this.c)}catch(x){z=H.G(x)
y=H.K(x)
w=this.a
w.b=new P.aH(z,y)
w.a=!0}}},
fa:{"^":"f:2;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.cJ(z)===!0&&w.e!=null){v=this.b
v.b=w.ct(z)
v.a=!1}}catch(u){y=H.G(u)
x=H.K(u)
w=this.a
v=J.aq(w.a.c)
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.aH(y,x)
s.a=!0}}},
cL:{"^":"a;a,b"},
ai:{"^":"a;$ti",
L:function(a,b){return new P.fn(b,this,[H.q(this,"ai",0),null])},
gj:function(a){var z,y
z={}
y=new P.a1(0,$.l,null,[P.j])
z.a=0
this.X(new P.ey(z),!0,new P.ez(z,y),y.gaP())
return y},
a_:function(a){var z,y,x
z=H.q(this,"ai",0)
y=H.t([],[z])
x=new P.a1(0,$.l,null,[[P.i,z]])
this.X(new P.eA(this,y),!0,new P.eB(y,x),x.gaP())
return x}},
ey:{"^":"f:0;a",
$1:function(a){++this.a.a}},
ez:{"^":"f:1;a,b",
$0:function(){this.b.am(this.a.a)}},
eA:{"^":"f;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.d3(function(a){return{func:1,args:[a]}},this.a,"ai")}},
eB:{"^":"f:1;a,b",
$0:function(){this.b.am(this.a)}},
ex:{"^":"a;"},
aX:{"^":"a;a8:e<,$ti",
aC:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.bc()
if((z&4)===0&&(this.e&32)===0)this.aT(this.gaY())},
bm:function(a){return this.aC(a,null)},
bo:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gF(z)}else z=!1
if(z)this.r.ac(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.aT(this.gb_())}}}},
a9:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.ai()
z=this.f
return z==null?$.$get$aL():z},
ai:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.bc()
if((this.e&32)===0)this.r=null
this.f=this.aX()},
ah:["bL",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.b4(a)
else this.ag(new P.eV(a,null,[H.q(this,"aX",0)]))}],
ae:["bM",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.b6(a,b)
else this.ag(new P.eX(a,b,null))}],
bV:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.b5()
else this.ag(C.n)},
aZ:[function(){},"$0","gaY",0,0,2],
b0:[function(){},"$0","gb_",0,0,2],
aX:function(){return},
ag:function(a){var z,y
z=this.r
if(z==null){z=new P.fv(null,null,0,[H.q(this,"aX",0)])
this.r=z}z.C(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.ac(this)}},
b4:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.aF(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aj((z&4)!==0)},
b6:function(a,b){var z,y
z=this.e
y=new P.eT(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.ai()
z=this.f
if(!!J.m(z).$isad&&z!==$.$get$aL())z.bv(y)
else y.$0()}else{y.$0()
this.aj((z&4)!==0)}},
b5:function(){var z,y
z=new P.eS(this)
this.ai()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.m(y).$isad&&y!==$.$get$aL())y.bv(z)
else z.$0()},
aT:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aj((z&4)!==0)},
aj:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gF(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gF(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.aZ()
else this.b0()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.ac(this)},
bP:function(a,b,c,d,e){var z,y
z=a==null?P.fN():a
y=this.d
y.toString
this.a=z
this.b=P.cU(b==null?P.fP():b,y)
this.c=c==null?P.fO():c}},
eT:{"^":"f:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.a6(y,{func:1,args:[P.a,P.ay]})
w=z.d
v=this.b
u=z.b
if(x)w.cQ(u,v,this.c)
else w.aF(u,v)
z.e=(z.e&4294967263)>>>0}},
eS:{"^":"f:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.bq(z.c)
z.e=(z.e&4294967263)>>>0}},
cO:{"^":"a;aa:a@"},
eV:{"^":"cO;b,a,$ti",
aD:function(a){a.b4(this.b)}},
eX:{"^":"cO;J:b>,M:c<,a",
aD:function(a){a.b6(this.b,this.c)}},
eW:{"^":"a;",
aD:function(a){a.b5()},
gaa:function(){return},
saa:function(a){throw H.d(new P.bx("No events after a done."))}},
fp:{"^":"a;a8:a<",
ac:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dd(new P.fq(this,a))
this.a=1},
bc:function(){if(this.a===1)this.a=3}},
fq:{"^":"f:1;a,b",
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
fv:{"^":"fp;b,c,a,$ti",
gF:function(a){return this.c==null},
C:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saa(b)
this.c=b}}},
bB:{"^":"ai;$ti",
X:function(a,b,c,d){return this.c_(a,d,c,!0===b)},
bk:function(a,b,c){return this.X(a,null,b,c)},
c_:function(a,b,c,d){return P.f3(this,a,b,c,d,H.q(this,"bB",0),H.q(this,"bB",1))},
aU:function(a,b){b.ah(a)},
c4:function(a,b,c){c.ae(a,b)},
$asai:function(a,b){return[b]}},
cP:{"^":"aX;x,y,a,b,c,d,e,f,r,$ti",
ah:function(a){if((this.e&2)!==0)return
this.bL(a)},
ae:function(a,b){if((this.e&2)!==0)return
this.bM(a,b)},
aZ:[function(){var z=this.y
if(z==null)return
z.bm(0)},"$0","gaY",0,0,2],
b0:[function(){var z=this.y
if(z==null)return
z.bo()},"$0","gb_",0,0,2],
aX:function(){var z=this.y
if(z!=null){this.y=null
return z.a9()}return},
cZ:[function(a){this.x.aU(a,this)},"$1","gc1",2,0,function(){return H.d3(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"cP")}],
d0:[function(a,b){this.x.c4(a,b,this)},"$2","gc3",4,0,10],
d_:[function(){this.bV()},"$0","gc2",0,0,2],
bR:function(a,b,c,d,e,f,g){this.y=this.x.a.bk(this.gc1(),this.gc2(),this.gc3())},
$asaX:function(a,b){return[b]},
k:{
f3:function(a,b,c,d,e,f,g){var z,y
z=$.l
y=e?1:0
y=new P.cP(a,null,null,null,null,z,y,null,null,[f,g])
y.bP(b,c,d,e,g)
y.bR(a,b,c,d,e,f,g)
return y}}},
fn:{"^":"bB;b,a,$ti",
aU:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.G(w)
x=H.K(w)
P.fx(b,y,x)
return}b.ah(z)}},
aH:{"^":"a;J:a>,M:b<",
h:function(a){return H.c(this.a)},
$isv:1},
fw:{"^":"a;"},
fD:{"^":"f:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cn()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.d(z)
x=H.d(z)
x.stack=J.S(y)
throw x}},
fr:{"^":"fw;",
bq:function(a){var z,y,x,w
try{if(C.b===$.l){x=a.$0()
return x}x=P.cV(null,null,this,a)
return x}catch(w){z=H.G(w)
y=H.K(w)
x=P.an(null,null,this,z,y)
return x}},
aF:function(a,b){var z,y,x,w
try{if(C.b===$.l){x=a.$1(b)
return x}x=P.cX(null,null,this,a,b)
return x}catch(w){z=H.G(w)
y=H.K(w)
x=P.an(null,null,this,z,y)
return x}},
cQ:function(a,b,c){var z,y,x,w
try{if(C.b===$.l){x=a.$2(b,c)
return x}x=P.cW(null,null,this,a,b,c)
return x}catch(w){z=H.G(w)
y=H.K(w)
x=P.an(null,null,this,z,y)
return x}},
az:function(a,b){if(b)return new P.fs(this,a)
else return new P.ft(this,a)},
cg:function(a,b){return new P.fu(this,a)},
i:function(a,b){return},
bp:function(a){if($.l===C.b)return a.$0()
return P.cV(null,null,this,a)},
aE:function(a,b){if($.l===C.b)return a.$1(b)
return P.cX(null,null,this,a,b)},
cP:function(a,b,c){if($.l===C.b)return a.$2(b,c)
return P.cW(null,null,this,a,b,c)}},
fs:{"^":"f:1;a,b",
$0:function(){return this.a.bq(this.b)}},
ft:{"^":"f:1;a,b",
$0:function(){return this.a.bp(this.b)}},
fu:{"^":"f:0;a,b",
$1:function(a){return this.a.aF(this.b,a)}}}],["","",,P,{"^":"",
eb:function(){return new H.Z(0,null,null,null,null,null,0,[null,null])},
af:function(a){return H.h4(a,new H.Z(0,null,null,null,null,null,0,[null,null]))},
e_:function(a,b,c){var z,y
if(P.bG(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$ao()
y.push(a)
try{P.fA(a,z)}finally{if(0>=y.length)return H.b(y,-1)
y.pop()}y=P.cw(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aM:function(a,b,c){var z,y,x
if(P.bG(a))return b+"..."+c
z=new P.by(b)
y=$.$get$ao()
y.push(a)
try{x=z
x.q=P.cw(x.gq(),a,", ")}finally{if(0>=y.length)return H.b(y,-1)
y.pop()}y=z
y.q=y.gq()+c
y=z.gq()
return y.charCodeAt(0)==0?y:y},
bG:function(a){var z,y
for(z=0;y=$.$get$ao(),z<y.length;++z)if(a===y[z])return!0
return!1},
fA:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gu(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.l())return
w=H.c(z.gm())
b.push(w)
y+=w.length+2;++x}if(!z.l()){if(x<=5)return
if(0>=b.length)return H.b(b,-1)
v=b.pop()
if(0>=b.length)return H.b(b,-1)
u=b.pop()}else{t=z.gm();++x
if(!z.l()){if(x<=4){b.push(H.c(t))
return}v=H.c(t)
if(0>=b.length)return H.b(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gm();++x
for(;z.l();t=s,s=r){r=z.gm();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.b(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.c(t)
v=H.c(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.b(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
ag:function(a,b,c,d){return new P.fg(0,null,null,null,null,null,0,[d])},
ee:function(a){var z,y,x
z={}
if(P.bG(a))return"{...}"
y=new P.by("")
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
cS:{"^":"Z;a,b,c,d,e,f,r,$ti",
V:function(a){return H.hs(a)&0x3ffffff},
W:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gbi()
if(x==null?b==null:x===b)return y}return-1},
k:{
ak:function(a,b){return new P.cS(0,null,null,null,null,null,0,[a,b])}}},
fg:{"^":"fe;a,b,c,d,e,f,r,$ti",
gu:function(a){var z=new P.bD(this,this.r,null,null)
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
bl:function(a){var z
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
return J.bO(y,x).gaR()},
C:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.aM(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.aM(x,b)}else return this.E(b)},
E:function(a){var z,y,x
z=this.d
if(z==null){z=P.fi()
this.d=z}y=this.a3(a)
x=z[y]
if(x==null)z[y]=[this.al(a)]
else{if(this.a4(x,a)>=0)return!1
x.push(this.al(a))}return!0},
Y:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.aN(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.aN(this.c,b)
else return this.c8(b)},
c8:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.a3(a)]
x=this.a4(y,a)
if(x<0)return!1
this.aO(y.splice(x,1)[0])
return!0},
N:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
aM:function(a,b){if(a[b]!=null)return!1
a[b]=this.al(b)
return!0},
aN:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.aO(z)
delete a[b]
return!0},
al:function(a){var z,y
z=new P.fh(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
aO:function(a){var z,y
z=a.gbX()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
a3:function(a){return J.R(a)&0x3ffffff},
a4:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.X(a[y].gaR(),b))return y
return-1},
$ish:1,
$ash:null,
k:{
fi:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
fh:{"^":"a;aR:a<,b,bX:c<"},
bD:{"^":"a;a,b,c,d",
gm:function(){return this.d},
l:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.ac(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
fe:{"^":"eu;$ti"},
ah:{"^":"eg;$ti"},
eg:{"^":"a+U;",$asi:null,$ash:null,$isi:1,$ish:1},
U:{"^":"a;$ti",
gu:function(a){return new H.cg(a,this.gj(a),0,null)},
w:function(a,b){return this.i(a,b)},
L:function(a,b){return new H.bq(a,b,[H.q(a,"U",0),null])},
a0:function(a,b){var z,y,x
z=H.t([],[H.q(a,"U",0)])
C.c.sj(z,this.gj(a))
for(y=0;y<this.gj(a);++y){x=this.i(a,y)
if(y>=z.length)return H.b(z,y)
z[y]=x}return z},
a_:function(a){return this.a0(a,!0)},
h:function(a){return P.aM(a,"[","]")},
$isi:1,
$asi:null,
$ish:1,
$ash:null},
ef:{"^":"f:11;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.q+=", "
z.a=!1
z=this.b
y=z.q+=H.c(a)
z.q=y+": "
z.q+=H.c(b)}},
ec:{"^":"ax;a,b,c,d,$ti",
gu:function(a){return new P.fj(this,this.c,this.d,this.b,null)},
gF:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
w:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(typeof b!=="number")return H.P(b)
if(0>b||b>=z)H.p(P.ae(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.b(y,w)
return y[w]},
N:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.b(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
h:function(a){return P.aM(this,"{","}")},
bn:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.d(H.cb());++this.d
y=this.a
x=y.length
if(z>=x)return H.b(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
E:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.b(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.aS();++this.d},
aS:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.t(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.c.aH(y,0,w,z,x)
C.c.aH(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
bN:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.t(z,[b])},
$ash:null,
k:{
bp:function(a,b){var z=new P.ec(null,0,0,0,[b])
z.bN(a,b)
return z}}},
fj:{"^":"a;a,b,c,d,e",
gm:function(){return this.e},
l:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.p(new P.ac(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.b(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
ev:{"^":"a;$ti",
L:function(a,b){return new H.c3(this,b,[H.r(this,0),null])},
h:function(a){return P.aM(this,"{","}")},
w:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(P.bQ("index"))
if(b<0)H.p(P.a_(b,0,null,"index",null))
for(z=new P.bD(this,this.r,null,null),z.c=this.e,y=0;z.l();){x=z.d
if(b===y)return x;++y}throw H.d(P.ae(b,this,"index",null,y))},
$ish:1,
$ash:null},
eu:{"^":"ev;$ti"}}],["","",,P,{"^":"",
c4:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.S(a)
if(typeof a==="string")return JSON.stringify(a)
return P.dF(a)},
dF:function(a){var z=J.m(a)
if(!!z.$isf)return z.h(a)
return H.aS(a)},
aK:function(a){return new P.f2(a)},
aO:function(a,b,c){var z,y
z=H.t([],[c])
for(y=J.aG(a);y.l();)z.push(y.gm())
if(b)return z
z.fixed$length=Array
return z},
bc:function(a){H.ht(H.c(a))},
fQ:{"^":"a;",
gp:function(a){return P.a.prototype.gp.call(this,this)},
h:function(a){return this?"true":"false"}},
"+bool":0,
bk:{"^":"a;a,b",
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.bk))return!1
return this.a===b.a&&this.b===b.b},
gp:function(a){var z=this.a
return(z^C.d.ax(z,30))&1073741823},
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
dA:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.c(z)
if(z>=10)return y+"00"+H.c(z)
return y+"000"+H.c(z)},
dB:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
ar:function(a){if(a>=10)return""+a
return"0"+a}}},
Q:{"^":"aC;"},
"+double":0,
as:{"^":"a;a",
a2:function(a,b){return new P.as(C.d.a2(this.a,b.gc0()))},
ab:function(a,b){return C.d.ab(this.a,b.gc0())},
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.as))return!1
return this.a===b.a},
gp:function(a){return this.a&0x1FFFFFFF},
h:function(a){var z,y,x,w,v
z=new P.dE()
y=this.a
if(y<0)return"-"+new P.as(0-y).h(0)
x=z.$1(C.d.H(y,6e7)%60)
w=z.$1(C.d.H(y,1e6)%60)
v=new P.dD().$1(y%1e6)
return""+C.d.H(y,36e8)+":"+H.c(x)+":"+H.c(w)+"."+H.c(v)},
k:{
c2:function(a,b,c,d,e,f){return new P.as(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
dD:{"^":"f:5;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
dE:{"^":"f:5;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
v:{"^":"a;",
gM:function(){return H.K(this.$thrownJsError)}},
cn:{"^":"v;",
h:function(a){return"Throw of null."}},
T:{"^":"v;a,b,c,d",
gap:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gao:function(){return""},
h:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.c(z)
w=this.gap()+y+x
if(!this.a)return w
v=this.gao()
u=P.c4(this.b)
return w+v+": "+H.c(u)},
k:{
bP:function(a){return new P.T(!1,null,null,a)},
bR:function(a,b,c){return new P.T(!0,a,b,c)},
bQ:function(a){return new P.T(!1,null,a,"Must not be null")}}},
cs:{"^":"T;e,f,a,b,c,d",
gap:function(){return"RangeError"},
gao:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.c(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.c(z)
else if(x>z)y=": Not in range "+H.c(z)+".."+H.c(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.c(z)}return y},
k:{
aT:function(a,b,c){return new P.cs(null,null,!0,a,b,"Value not in range")},
a_:function(a,b,c,d,e){return new P.cs(b,c,!0,a,d,"Invalid value")},
ct:function(a,b,c,d,e,f){if(0>a||a>c)throw H.d(P.a_(a,0,c,"start",f))
if(a>b||b>c)throw H.d(P.a_(b,a,c,"end",f))
return b}}},
dM:{"^":"T;e,j:f>,a,b,c,d",
gap:function(){return"RangeError"},
gao:function(){if(J.di(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.c(z)},
k:{
ae:function(a,b,c,d,e){var z=e!=null?e:J.aa(b)
return new P.dM(b,z,!0,a,c,"Index out of range")}}},
B:{"^":"v;a",
h:function(a){return"Unsupported operation: "+this.a}},
cK:{"^":"v;a",
h:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.c(z):"UnimplementedError"}},
bx:{"^":"v;a",
h:function(a){return"Bad state: "+this.a}},
ac:{"^":"v;a",
h:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.c(P.c4(z))+"."}},
cv:{"^":"a;",
h:function(a){return"Stack Overflow"},
gM:function(){return},
$isv:1},
dz:{"^":"v;a",
h:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.c(z)+"' during its initialization"}},
f2:{"^":"a;a",
h:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.c(z)}},
dK:{"^":"a;a,b,c",
h:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(x.length>78)x=C.f.ad(x,0,75)+"..."
return y+"\n"+x}},
dG:{"^":"a;a,aW",
h:function(a){return"Expando:"+H.c(this.a)},
i:function(a,b){var z,y
z=this.aW
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.p(P.bR(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.bv(b,"expando$values")
return y==null?null:H.bv(y,z)},
t:function(a,b,c){var z,y
z=this.aW
if(typeof z!=="string")z.set(b,c)
else{y=H.bv(b,"expando$values")
if(y==null){y=new P.a()
H.cr(b,"expando$values",y)}H.cr(y,z,c)}}},
j:{"^":"aC;"},
"+int":0,
L:{"^":"a;$ti",
L:function(a,b){return H.aQ(this,b,H.q(this,"L",0),null)},
a0:function(a,b){return P.aO(this,!0,H.q(this,"L",0))},
a_:function(a){return this.a0(a,!0)},
gj:function(a){var z,y
z=this.gu(this)
for(y=0;z.l();)++y
return y},
w:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(P.bQ("index"))
if(b<0)H.p(P.a_(b,0,null,"index",null))
for(z=this.gu(this),y=0;z.l();){x=z.gm()
if(b===y)return x;++y}throw H.d(P.ae(b,this,"index",null,y))},
h:function(a){return P.e_(this,"(",")")}},
cc:{"^":"a;"},
i:{"^":"a;$ti",$asi:null,$ish:1,$ash:null},
"+List":0,
aR:{"^":"a;",
gp:function(a){return P.a.prototype.gp.call(this,this)},
h:function(a){return"null"}},
"+Null":0,
aC:{"^":"a;"},
"+num":0,
a:{"^":";",
n:function(a,b){return this===b},
gp:function(a){return H.W(this)},
h:function(a){return H.aS(this)},
toString:function(){return this.h(this)}},
ay:{"^":"a;"},
a0:{"^":"a;"},
"+String":0,
by:{"^":"a;q<",
gj:function(a){return this.q.length},
h:function(a){var z=this.q
return z.charCodeAt(0)==0?z:z},
k:{
cw:function(a,b,c){var z=J.aG(b)
if(!z.l())return a
if(c.length===0){do a+=H.c(z.gm())
while(z.l())}else{a+=H.c(z.gm())
for(;z.l();)a=a+c+H.c(z.gm())}return a}}}}],["","",,W,{"^":"",
dy:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(b,c){return c.toUpperCase()})},
b_:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
fF:function(a){var z=$.l
if(z===C.b)return a
return z.cg(a,!0)},
w:{"^":"C;","%":"HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSlotElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
hD:{"^":"w;",
h:function(a){return String(a)},
$ise:1,
"%":"HTMLAnchorElement"},
hF:{"^":"w;",
h:function(a){return String(a)},
$ise:1,
"%":"HTMLAreaElement"},
hG:{"^":"w;",$ise:1,"%":"HTMLBodyElement"},
bU:{"^":"w;",$isa:1,"%":"HTMLCanvasElement"},
hH:{"^":"n;j:length=",$ise:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
dw:{"^":"dN;j:length=",
aL:function(a,b){var z,y
z=$.$get$bW()
y=z[b]
if(typeof y==="string")return y
y=W.dy(b) in a?b:P.dC()+b
z[b]=y
return y},
b7:function(a,b,c,d){a.setProperty(b,c,d)},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
dN:{"^":"e+dx;"},
dx:{"^":"a;"},
hI:{"^":"n;",$ise:1,"%":"DocumentFragment|ShadowRoot"},
hJ:{"^":"e;",
h:function(a){return String(a)},
"%":"DOMException"},
cN:{"^":"ah;a,b",
gj:function(a){return this.b.length},
i:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.b(z,b)
return z[b]},
t:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.b(z,b)
this.a.replaceChild(c,z[b])},
C:function(a,b){this.a.appendChild(b)
return b},
gu:function(a){var z=this.a_(this)
return new J.bh(z,z.length,0,null)},
ce:function(a,b){var z,y,x
for(z=b.length,y=this.a,x=0;x<b.length;b.length===z||(0,H.df)(b),++x)y.appendChild(b[x])},
$asah:function(){return[W.C]},
$asi:function(){return[W.C]},
$ash:function(){return[W.C]}},
C:{"^":"n;",
gaA:function(a){return new W.cN(a,a.children)},
h:function(a){return a.localName},
gO:function(a){return new W.aZ(a,"mouseenter",!1,[W.br])},
gP:function(a){return new W.aZ(a,"mouseleave",!1,[W.br])},
$isC:1,
$isa:1,
$ise:1,
"%":";Element"},
hK:{"^":"w;v:src}","%":"HTMLEmbedElement"},
hL:{"^":"aJ;J:error=","%":"ErrorEvent"},
aJ:{"^":"e;","%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|ClipboardEvent|CloseEvent|CompositionEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|DragEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FocusEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|KeyboardEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MouseEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PointerEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SVGZoomEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TextEvent|TouchEvent|TrackEvent|TransitionEvent|UIEvent|USBConnectionEvent|WebGLContextEvent|WebKitTransitionEvent|WheelEvent;Event|InputEvent"},
bl:{"^":"e;",
bU:function(a,b,c,d){return a.addEventListener(b,H.ap(c,1),!1)},
c9:function(a,b,c,d){return a.removeEventListener(b,H.ap(c,1),!1)},
"%":"MediaStream|MessagePort|ScreenOrientation;EventTarget"},
i2:{"^":"w;j:length=","%":"HTMLFormElement"},
i4:{"^":"dQ;",
gj:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.ae(b,a,null,null,null))
return a[b]},
t:function(a,b,c){throw H.d(new P.B("Cannot assign element of immutable List."))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.n]},
$ish:1,
$ash:function(){return[W.n]},
$isH:1,
$asH:function(){return[W.n]},
$isz:1,
$asz:function(){return[W.n]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
dO:{"^":"e+U;",
$asi:function(){return[W.n]},
$ash:function(){return[W.n]},
$isi:1,
$ish:1},
dQ:{"^":"dO+c8;",
$asi:function(){return[W.n]},
$ash:function(){return[W.n]},
$isi:1,
$ish:1},
i5:{"^":"w;v:src}","%":"HTMLIFrameElement"},
dL:{"^":"w;v:src}",$isa:1,"%":"HTMLImageElement"},
i7:{"^":"w;v:src}",$isC:1,$ise:1,"%":"HTMLInputElement"},
ia:{"^":"e;",
h:function(a){return String(a)},
"%":"Location"},
id:{"^":"w;J:error=,v:src}","%":"HTMLAudioElement|HTMLMediaElement|HTMLVideoElement"},
ip:{"^":"e;",$ise:1,"%":"Navigator"},
eU:{"^":"ah;a",
t:function(a,b,c){var z,y
z=this.a
y=z.childNodes
if(b>>>0!==b||b>=y.length)return H.b(y,b)
z.replaceChild(c,y[b])},
gu:function(a){var z=this.a.childNodes
return new W.c7(z,z.length,-1,null)},
gj:function(a){return this.a.childNodes.length},
i:function(a,b){var z=this.a.childNodes
if(b>>>0!==b||b>=z.length)return H.b(z,b)
return z[b]},
$asah:function(){return[W.n]},
$asi:function(){return[W.n]},
$ash:function(){return[W.n]}},
n:{"^":"bl;",
cL:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
cO:function(a,b){var z,y
try{z=a.parentNode
J.dl(z,b,a)}catch(y){H.G(y)}return a},
h:function(a){var z=a.nodeValue
return z==null?this.bJ(a):z},
ca:function(a,b,c){return a.replaceChild(b,c)},
$isa:1,
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
iq:{"^":"dR;",
gj:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.ae(b,a,null,null,null))
return a[b]},
t:function(a,b,c){throw H.d(new P.B("Cannot assign element of immutable List."))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.b(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.n]},
$ish:1,
$ash:function(){return[W.n]},
$isH:1,
$asH:function(){return[W.n]},
$isz:1,
$asz:function(){return[W.n]},
"%":"NodeList|RadioNodeList"},
dP:{"^":"e+U;",
$asi:function(){return[W.n]},
$ash:function(){return[W.n]},
$isi:1,
$ish:1},
dR:{"^":"dP+c8;",
$asi:function(){return[W.n]},
$ash:function(){return[W.n]},
$isi:1,
$ish:1},
is:{"^":"w;v:src}","%":"HTMLScriptElement"},
iu:{"^":"w;j:length=","%":"HTMLSelectElement"},
iv:{"^":"w;v:src}","%":"HTMLSourceElement"},
iw:{"^":"aJ;J:error=","%":"SpeechRecognitionError"},
iA:{"^":"w;v:src}","%":"HTMLTrackElement"},
eL:{"^":"bl;",
gby:function(a){return"scrollY" in a?C.a.R(a.scrollY):C.a.R(a.document.documentElement.scrollTop)},
$ise:1,
"%":"DOMWindow|Window"},
iG:{"^":"e;cC:height=,cI:left=,cS:top=,cU:width=",
h:function(a){return"Rectangle ("+H.c(a.left)+", "+H.c(a.top)+") "+H.c(a.width)+" x "+H.c(a.height)},
n:function(a,b){var z,y,x
if(b==null)return!1
z=J.m(b)
if(!z.$iscu)return!1
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
z=J.R(a.left)
y=J.R(a.top)
x=J.R(a.width)
w=J.R(a.height)
w=W.b_(W.b_(W.b_(W.b_(0,z),y),x),w)
v=536870911&w+((67108863&w)<<3)
v^=v>>>11
return 536870911&v+((16383&v)<<15)},
$iscu:1,
$ascu:I.y,
"%":"ClientRect"},
iH:{"^":"n;",$ise:1,"%":"DocumentType"},
iJ:{"^":"w;",$ise:1,"%":"HTMLFrameSetElement"},
iN:{"^":"bl;",$ise:1,"%":"ServiceWorker"},
f_:{"^":"ai;a,b,c,$ti",
X:function(a,b,c,d){return W.x(this.a,this.b,a,!1,H.r(this,0))},
bk:function(a,b,c){return this.X(a,null,b,c)}},
aZ:{"^":"f_;a,b,c,$ti"},
f0:{"^":"ex;a,b,c,d,e,$ti",
a9:function(){if(this.b==null)return
this.ba()
this.b=null
this.d=null
return},
aC:function(a,b){if(this.b==null)return;++this.a
this.ba()},
bm:function(a){return this.aC(a,null)},
bo:function(){if(this.b==null||this.a<=0)return;--this.a
this.b8()},
b8:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dj(x,this.c,z,!1)}},
ba:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dk(x,this.c,z,!1)}},
bQ:function(a,b,c,d,e){this.b8()},
k:{
x:function(a,b,c,d,e){var z=c==null?null:W.fF(new W.f1(c))
z=new W.f0(0,a,b,z,!1,[e])
z.bQ(a,b,c,!1,e)
return z}}},
f1:{"^":"f:0;a",
$1:function(a){return this.a.$1(a)}},
c8:{"^":"a;$ti",
gu:function(a){return new W.c7(a,this.gj(a),-1,null)},
$isi:1,
$asi:null,
$ish:1,
$ash:null},
c7:{"^":"a;a,b,c,d",
l:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.bO(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gm:function(){return this.d}}}],["","",,P,{"^":"",
c1:function(){var z=$.c0
if(z==null){z=J.bf(window.navigator.userAgent,"Opera",0)
$.c0=z}return z},
dC:function(){var z,y
z=$.bY
if(z!=null)return z
y=$.bZ
if(y==null){y=J.bf(window.navigator.userAgent,"Firefox",0)
$.bZ=y}if(y)z="-moz-"
else{y=$.c_
if(y==null){y=P.c1()!==!0&&J.bf(window.navigator.userAgent,"Trident/",0)
$.c_=y}if(y)z="-ms-"
else z=P.c1()===!0?"-o-":"-webkit-"}$.bY=z
return z},
dH:{"^":"ah;a,b",
ga6:function(){var z,y
z=this.b
y=H.q(z,"U",0)
return new H.aP(new H.eJ(z,new P.dI(),[y]),new P.dJ(),[y,null])},
t:function(a,b,c){var z=this.ga6()
J.dn(z.b.$1(J.aF(z.a,b)),c)},
C:function(a,b){this.b.a.appendChild(b)},
gj:function(a){return J.aa(this.ga6().a)},
i:function(a,b){var z=this.ga6()
return z.b.$1(J.aF(z.a,b))},
gu:function(a){var z=P.aO(this.ga6(),!1,W.C)
return new J.bh(z,z.length,0,null)},
$asah:function(){return[W.C]},
$asi:function(){return[W.C]},
$ash:function(){return[W.C]}},
dI:{"^":"f:0;",
$1:function(a){return!!J.m(a).$isC}},
dJ:{"^":"f:0;",
$1:function(a){return H.he(a,"$isC")}}}],["","",,P,{"^":""}],["","",,P,{"^":"",hC:{"^":"at;",$ise:1,"%":"SVGAElement"},hE:{"^":"k;",$ise:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},hM:{"^":"k;",$ise:1,"%":"SVGFEBlendElement"},hN:{"^":"k;",$ise:1,"%":"SVGFEColorMatrixElement"},hO:{"^":"k;",$ise:1,"%":"SVGFEComponentTransferElement"},hP:{"^":"k;",$ise:1,"%":"SVGFECompositeElement"},hQ:{"^":"k;",$ise:1,"%":"SVGFEConvolveMatrixElement"},hR:{"^":"k;",$ise:1,"%":"SVGFEDiffuseLightingElement"},hS:{"^":"k;",$ise:1,"%":"SVGFEDisplacementMapElement"},hT:{"^":"k;",$ise:1,"%":"SVGFEFloodElement"},hU:{"^":"k;",$ise:1,"%":"SVGFEGaussianBlurElement"},hV:{"^":"k;",$ise:1,"%":"SVGFEImageElement"},hW:{"^":"k;",$ise:1,"%":"SVGFEMergeElement"},hX:{"^":"k;",$ise:1,"%":"SVGFEMorphologyElement"},hY:{"^":"k;",$ise:1,"%":"SVGFEOffsetElement"},hZ:{"^":"k;",$ise:1,"%":"SVGFESpecularLightingElement"},i_:{"^":"k;",$ise:1,"%":"SVGFETileElement"},i0:{"^":"k;",$ise:1,"%":"SVGFETurbulenceElement"},i1:{"^":"k;",$ise:1,"%":"SVGFilterElement"},at:{"^":"k;",$ise:1,"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},i6:{"^":"at;",$ise:1,"%":"SVGImageElement"},ib:{"^":"k;",$ise:1,"%":"SVGMarkerElement"},ic:{"^":"k;",$ise:1,"%":"SVGMaskElement"},ir:{"^":"k;",$ise:1,"%":"SVGPatternElement"},it:{"^":"k;",$ise:1,"%":"SVGScriptElement"},k:{"^":"C;",
gaA:function(a){return new P.dH(a,new W.eU(a))},
gO:function(a){return new W.aZ(a,"mouseenter",!1,[W.br])},
gP:function(a){return new W.aZ(a,"mouseleave",!1,[W.br])},
$ise:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},ix:{"^":"at;",$ise:1,"%":"SVGSVGElement"},iy:{"^":"k;",$ise:1,"%":"SVGSymbolElement"},eC:{"^":"at;","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement;SVGTextContentElement"},iz:{"^":"eC;",$ise:1,"%":"SVGTextPathElement"},iB:{"^":"at;",$ise:1,"%":"SVGUseElement"},iC:{"^":"k;",$ise:1,"%":"SVGViewElement"},iI:{"^":"k;",$ise:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},iK:{"^":"k;",$ise:1,"%":"SVGCursorElement"},iL:{"^":"k;",$ise:1,"%":"SVGFEDropShadowElement"},iM:{"^":"k;",$ise:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,F,{"^":"",
iT:[function(){var z,y,x,w,v
$.D=H.t([],[W.bU])
y=[P.Q]
$.b5=H.t([],y)
$.aB=H.t([],y)
$.b4=H.t([],y)
$.b3=H.t([],y)
$.b2=H.t([],[W.dL])
$.bI=P.c2(0,0,0,250,0,0)
$.bL=new P.bk(Date.now(),!1)
y=document.documentElement
x=y.clientWidth
x.toString
w=window.innerWidth
w.toString
$.u=Math.max(H.I(x),H.I(w))
y=y.clientHeight
y.toString
w=window.innerHeight
w.toString
$.a8=Math.max(H.I(y),H.I(w))
F.fR()
w=W.aJ
W.x(window,"resize",new F.ho(),!1,w)
try{y=window.screen.orientation
y.toString
W.x(y,"change",new F.hp(),!1,w)}catch(v){z=H.G(v)
P.bc(z)}W.x(window,"scroll",new F.hq(),!1,w)},"$0","d8",0,0,2],
db:function(){var z=Date.now()
$.d9=new P.bk(z,!1)
if(C.d.H(P.c2(0,0,0,z-$.bL.a,0,0).a,1000)<C.d.H($.bI.a,1000)){z=$.dg
if(z!=null)z.a9()
$.dg=P.cy($.bI,F.hn())}$.bL=$.d9},
iU:[function(){var z,y,x,w
z=$.u
y=document.documentElement
x=y.clientWidth
x.toString
w=window.innerWidth
w.toString
if(z!==Math.max(H.I(x),H.I(w)))window.location.reload()
else{z=y.clientHeight
z.toString
y=window.innerHeight
y.toString
$.a8=Math.max(H.I(z),H.I(y))
F.fG()}},"$0","hn",0,0,2],
fH:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=H.t([],[W.bU])
for(y=W.aJ,x=0;x<3;++x){w={}
v=$.aE
u=$.a8
if(typeof v!=="number")return v.bx()
if(typeof u!=="number")return H.P(u)
if(v>u){t=c[x]
c[x]=t-(v-u)*t/v*$.aD}v=document
s=v.createElement("canvas")
z.push(s)
if(x>=z.length)return H.b(z,x)
z[x].width=C.a.aG(b[x])
if(x>=z.length)return H.b(z,x)
z[x].height=C.a.aG(c[x])
s=v.createElement("img")
s.src=a[x]
v=b[x]
u=$.b4
t=u.length
if(x>=t)return H.b(u,x)
r=u[x]
q=v/r
w.a=q
w.b=0
p=$.b3
if(x>=p.length)return H.b(p,x)
p=p[x]
o=c[x]
if(p*q<o){q=o/p
w.a=q
if(x>=t)return H.b(u,x)
w.b=(r*q-v)*0.5}$.b2.push(s)
W.x(s,"load",new F.fI(w,z,x,s),!1,y)
v=z.length
if(x>=v)return H.b(z,x)
u=z[x]
t=u.style
t.zIndex="-1"
if(x>=v)return H.b(z,x)
t=u.style
t.position="absolute"
if(x>=v)return H.b(z,x)
v=u.style
u=$.u
t=b[x]
if(typeof u!=="number")return u.aI()
t=C.a.h((u-t)*0.5)+"px"
v.left=t
$.b5.push(b[x])
$.aB.push(c[x])
v=window
v="scrollY" in v?C.a.R(v.scrollY):C.a.R(v.document.documentElement.scrollTop)
$.be=v
n=v*$.aD
for(v=$.aB,m=0;m<x;++m){if(m>=v.length)return H.b(v,m)
n+=v[m]}if(x>=z.length)return H.b(z,x)
v=z[x].style
u=C.a.h(n)+"px"
v.top=u
v=$.D
if(x>=z.length)return H.b(z,x)
v.push(z[x])}y=document.body
new W.cN(y,y.children).ce(0,z)},
fG:function(){var z,y,x,w,v,u,t,s,r,q,p
z=$.D.length
y=$.aE
if(typeof y!=="number")return y.A()
x=y*0.3
w=[y*0.4,x,x]
for(v=0;v<z;++v){y=$.aE
x=$.a8
if(typeof y!=="number")return y.bx()
if(typeof x!=="number")return H.P(x)
if(y>x){if(v>=3)return H.b(w,v)
u=w[v]
w[v]=u-(y-x)*u/y*$.aD}y=$.D
if(v>=y.length)return H.b(y,v)
y=y[v]
if(v>=3)return H.b(w,v)
y.height=C.a.aG(w[v])
y=$.b5
if(v>=y.length)return H.b(y,v)
y=y[v]
x=$.b4
if(v>=x.length)return H.b(x,v)
x=x[v]
t=y/x
u=$.b3
if(v>=u.length)return H.b(u,v)
u=u[v]
s=w[v]
if(u*t<s){t=s/u
r=(x*t-y)*0.5}else r=0
y=$.D
if(v>=y.length)return H.b(y,v)
y[v].getContext("2d").resetTransform()
y=$.D
if(v>=y.length)return H.b(y,v)
y[v].getContext("2d").translate(-r,0)
y=$.D
if(v>=y.length)return H.b(y,v)
y[v].getContext("2d").scale(t,t)
y=$.D
if(v>=y.length)return H.b(y,v)
y=y[v].getContext("2d")
x=$.b2
if(v>=x.length)return H.b(x,v)
y.drawImage(x[v],0,0)
x=$.aB
y=w[v]
if(v>=x.length)return H.b(x,v)
x[v]=y
y=window
y="scrollY" in y?C.a.R(y.scrollY):C.a.R(y.document.documentElement.scrollTop)
$.be=y
q=y*$.aD
for(p=0;p<v;++p)q+=w[p]
y=$.D
if(v>=y.length)return H.b(y,v)
y=y[v].style
x=C.a.h(q)+"px"
y.top=x}},
hv:function(a){var z,y,x,w,v
z=$.D.length
for(y=0;y<z;++y){x=$.D
if(y>=x.length)return H.b(x,y)
x=x[y].style.top
w=H.ep(H.hz(x,"px",""),null)
x=$.D
if(y>=x.length)return H.b(x,y)
x=x[y].style
v=J.S(J.a9(w,a))+"px"
x.top=v}},
fR:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9
z=$.u
z.toString
if(typeof z!=="number")return z.A()
y=z*0.05
x=y*0.8
w=y*0.3
v=y*0.45
u=document
t=u.querySelector("#header")
s=t.style
s.position="fixed"
s=t.style
s.backgroundColor="rgba(200, 200, 200, 0.97)"
s=t.style
r=C.a.h(z)+"px"
s.width=r
s=t.style
r=C.a.h(y)+"px"
s.height=r
q=u.querySelector("#get_trial")
s=q.style
r=C.a.h(y)+"px"
s.height=r
s=q.style
r=C.a.h(v)+"px"
s.fontSize=r
s=q.style
r=C.a.h((y-v)*0.5)+"px"
s.top=r
s=q.style
r=C.a.h(4*w+3*y)+"px"
s.right=r
p=u.querySelector("#logo")
s=p.style
r=C.a.h(x)+"px"
s.height=r
s=p.style
r=C.a.h((y-x)*0.5)+"px"
s.top=r
s=p.style
r=C.a.h(w)+"px"
s.left=r
o=u.querySelector("#inkandpaper")
s=o.style
r=C.a.h(x)+"px"
s.height=r
s=o.style
r=C.a.h(x)+"px"
s.fontSize=r
s=o.style
r=C.a.h(w+x*1.1)+"px"
s.left=r
s=o.style
r=C.a.h((x-x)*0.5)+"px"
s.top=r
n=u.querySelector("#google_play")
s=J.E(n)
s.sv(n,"./images/google_play_logo_white.png")
r=n.style
m=C.a.h(y)+"px"
r.height=m
r=s.gO(n)
W.x(r.a,r.b,new F.fS(n),!1,H.r(r,0))
s=s.gP(n)
W.x(s.a,s.b,new F.fT(n),!1,H.r(s,0))
s=n.style
r=(y-y)*0.5
m=C.a.h(r)+"px"
s.top=m
s=n.style
m=C.a.h(3*w+2*y)+"px"
s.right=m
l=u.querySelector("#amazon")
s=J.E(l)
s.sv(l,"./images/amazon_logo_white.png")
m=l.style
k=C.a.h(y)+"px"
m.height=k
m=s.gO(l)
W.x(m.a,m.b,new F.fU(l),!1,H.r(m,0))
s=s.gP(l)
W.x(s.a,s.b,new F.fV(l),!1,H.r(s,0))
s=l.style
m=C.a.h(r)+"px"
s.top=m
s=l.style
m=2*w
k=C.a.h(m+y)+"px"
s.right=k
j=u.querySelector("#samsung")
s=J.E(j)
s.sv(j,"./images/samsung_logo_white.png")
k=j.style
i=C.a.h(y)+"px"
k.height=i
k=s.gO(j)
W.x(k.a,k.b,new F.fW(j),!1,H.r(k,0))
s=s.gP(j)
W.x(s.a,s.b,new F.fX(j),!1,H.r(s,0))
s=j.style
r=C.a.h(r)+"px"
s.top=r
s=j.style
r=C.a.h(w)+"px"
s.right=r
h=$.u
h.toString
if(typeof h!=="number")return h.cV()
g=h/1280*243
f=h*0.8
e=g+f/1280*125
d=y*1.5
c=u.querySelector("#title")
s=c.style
r=C.a.h(h)+"px"
s.width=r
s=c.style
r=C.e.h(e)+"px"
s.height=r
s=c.style
r=C.a.h(d)+"px"
s.top=r
s=u.querySelector("#banner").style
r=C.a.h(h)+"px"
s.width=r
b=u.querySelector("#subtitle")
s=b.style
r=C.a.h(f)+"px"
s.width=r
s=b.style
r=$.u
if(typeof r!=="number")return r.aI()
r=C.a.h((r-f)*0.5)+"px"
s.left=r
s=b.style
r=C.e.h(g)+"px"
s.top=r
s=$.u
if(typeof s!=="number")return s.A()
a=s*0.02
a0=s*0.04
a1=s*0.5
a2=s*0.1
a3=a1*0.65
r=a1-a3
a4=r/1280*536
a5=u.querySelector("#div1")
k=a5.style
i=C.a.h(d)+"px"
k.top=i
k=a5.style
i=C.a.h(a2)+"px"
k.marginTop=i
k=a5.style
s=C.a.h(s)+"px"
k.width=s
s=a5.style
k=C.a.h(a1)+"px"
s.height=k
a6=u.querySelector("#text1")
s=a6.style
k=C.e.h(a4)+"px"
s.top=k
s=a6.style
k=C.a.h(a2*0.5)+"px"
s.left=k
s=a6.style
k=C.a.h(a1-a2)+"px"
s.maxWidth=k
s=a6.style
k=C.a.h(a)+"px"
s.fontSize=k
s=a6.style
k=C.a.h(a0)+"px"
s.lineHeight=k
a7=u.querySelector("#image1")
s=a7.style
r=C.a.h(r)+"px"
s.width=r
s=a7.style
r=C.a.h(a3*0.5)+"px"
s.left=r
s=a7.style
s.top="0px"
s=$.u
s.toString
if(typeof s!=="number")return s.A()
a8=s*0.53
a9=s*0.5
b0=s*0.1
b1=a9*0.1
r=a9-b1
b2=r/1251*860
b3=u.querySelector("#div2")
k=b3.style
s=C.a.h(s)+"px"
k.width=s
s=b3.style
k=C.a.h(a8)+"px"
s.height=k
s=b3.style
k=C.d.h(0)+"px"
s.marginTop=k
b4=u.querySelector("#image2")
s=b4.style
r=C.a.h(r)+"px"
s.width=r
s=b4.style
r=C.e.h(b2)+"px"
s.height=r
s=b4.style
r=C.a.h((a8-b2)*0.5)+"px"
s.top=r
s=b4.style
r=C.a.h(b1*0.5)+"px"
s.left=r
b5=u.querySelector("#text2")
s=b5.style
r=C.e.h(a4*0.6)+"px"
s.top=r
s=b5.style
r=C.a.h(b0*0.5)+"px"
s.right=r
s=b5.style
b0=C.a.h(a9-b0)+"px"
s.maxWidth=b0
s=b5.style
r=C.a.h(a)+"px"
s.fontSize=r
s=b5.style
r=C.a.h(a0)+"px"
s.lineHeight=r
s=$.u
s.toString
if(typeof s!=="number")return s.A()
b6=s*0.37
b7=s*0.1
b8=s*0.5
b9=b8*0.65
r=b8-b9
c0=u.querySelector("#div3")
k=c0.style
i=C.a.h(b7)+"px"
k.marginTop=i
k=c0.style
s=C.a.h(s)+"px"
k.width=s
s=c0.style
k=C.a.h(b6)+"px"
s.height=k
c1=u.querySelector("#text3")
s=c1.style
k=C.e.h(r/1280*536)+"px"
s.top=k
s=c1.style
k=C.a.h(b7*0.5)+"px"
s.left=k
s=c1.style
b8=C.a.h(b8-b7)+"px"
s.maxWidth=b8
s=c1.style
k=C.a.h(a)+"px"
s.fontSize=k
s=c1.style
k=C.a.h(a0)+"px"
s.lineHeight=k
c2=u.querySelector("#image3")
s=c2.style
r=C.a.h(r)+"px"
s.width=r
s=c2.style
r=C.a.h(b9*0.5)+"px"
s.left=r
s=c2.style
s.top="0px"
s=J.E(c0)
s.gaA(c0).C(0,c1)
s.gaA(c0).C(0,c2)
s=$.u
s.toString
if(typeof s!=="number")return s.A()
c3=s*0.4
c4=s*0.5
c5=s*0.1
c6=c4*0.1
c1=c4-c6
c7=c1/1251*860
c8=u.querySelector("#div4")
r=c8.style
s=C.a.h(s)+"px"
r.width=s
s=c8.style
r=C.a.h(c3)+"px"
s.height=r
s=c8.style
r=C.d.h(0)+"px"
s.marginTop=r
c9=u.querySelector("#image4")
s=c9.style
c1=C.a.h(c1)+"px"
s.width=c1
s=c9.style
r=C.a.h((c3-c7)*0.5)+"px"
s.top=r
s=c9.style
r=C.a.h(c6*0.5)+"px"
s.left=r
s=c9.style
r=C.e.h(c7)+"px"
s.height=r
d0=u.querySelector("#text4")
s=d0.style
r=C.e.h(a4)+"px"
s.top=r
s=d0.style
r=C.a.h(c5*0.5)+"px"
s.right=r
s=d0.style
c5=C.a.h(c4-c5)+"px"
s.maxWidth=c5
s=d0.style
r=C.a.h(a)+"px"
s.fontSize=r
s=d0.style
r=C.a.h(a0)+"px"
s.lineHeight=r
s=$.u
s.toString
if(typeof s!=="number")return s.A()
d1=s*0.3
d2=s*0.1
d3=s*0.5
d4=d3*0.6
r=d3-d4
d5=u.querySelector("#div5")
k=d5.style
i=C.a.h(d2)+"px"
k.marginTop=i
k=d5.style
s=C.a.h(s)+"px"
k.width=s
s=d5.style
k=C.a.h(d1)+"px"
s.height=k
d6=u.querySelector("#text5")
s=d6.style
k=C.e.h(r/1280*536)+"px"
s.top=k
s=d6.style
k=C.a.h(d2*0.5)+"px"
s.left=k
s=d6.style
d3=C.a.h(d3-d2)+"px"
s.maxWidth=d3
s=d6.style
k=C.a.h(a)+"px"
s.fontSize=k
s=d6.style
k=C.a.h(a0)+"px"
s.lineHeight=k
d7=u.querySelector("#image5")
s=d7.style
r=C.a.h(r)+"px"
s.width=r
s=d7.style
r=C.a.h(d4*0.5)+"px"
s.left=r
s=d7.style
s.top="0px"
s=$.u
s.toString
if(typeof s!=="number")return s.A()
d8=s*0.1
d9=s*0.01
e0=s*0.04
e1=u.querySelector("#div6")
r=e1.style
k=C.a.h(s)+"px"
r.width=k
r=e1.style
k=C.a.h(d8)+"px"
r.height=k
r=e1.style
k=C.a.h(d8)+"px"
r.marginTop=k
e2=u.querySelector("#text6")
r=e2.style
k=C.a.h(d8*0.5)+"px"
r.left=k
r=e2.style
s=C.a.h(s-d8)+"px"
r.maxWidth=s
s=e2.style
r=C.a.h(a)+"px"
s.fontSize=r
s=e2.style
r=C.a.h(a0)+"px"
s.lineHeight=r
e3=u.querySelector("#youtube_link_1")
s=e3.style
r=C.a.h(a)+"px"
s.fontSize=r
s=e3.style
r=C.a.h(d9)+"px"
s.padding=r
s=e3.style
r=C.a.h(d9)+"px"
C.h.b7(s,(s&&C.h).aL(s,"border-radius"),r,"")
r=e3.style
s=C.a.h(e0)+"px"
r.top=s
s=e3.style
r=$.u
if(typeof r!=="number")return r.A()
r=C.a.h(r*0.4)+"px"
s.left=r
e4=u.querySelector("#youtube_link_2")
s=e4.style
r=C.a.h(a)+"px"
s.fontSize=r
s=e4.style
r=C.a.h(d9)+"px"
s.padding=r
s=e4.style
r=C.a.h(d9)+"px"
C.h.b7(s,(s&&C.h).aL(s,"border-radius"),r,"")
r=e4.style
s=C.a.h(e0)+"px"
r.top=s
s=e4.style
r=$.u
if(typeof r!=="number")return r.A()
r=C.a.h(r*0.5)+"px"
s.left=r
e5=y*0.75
e6=u.querySelector("#footer")
s=e6.style
r=C.a.h(z)+"px"
s.width=r
s=e6.style
r=C.a.h(d)+"px"
s.height=r
s=e6.style
r=C.a.h(y)+"px"
s.top=r
e7=u.querySelector("#mail")
s=J.E(e7)
r=s.gO(e7)
W.x(r.a,r.b,new F.fY(e7),!1,H.r(r,0))
s=s.gP(e7)
W.x(s.a,s.b,new F.fZ(e7),!1,H.r(s,0))
s=e7.style
r=C.a.h(e5)+"px"
s.height=r
s=e7.style
r=C.a.h(w)+"px"
s.right=r
s=e7.style
r=(d-e5)*0.5
k=C.a.h(r)+"px"
s.top=k
e8=u.querySelector("#facebook")
s=J.E(e8)
s.sv(e8,"./images/facebook_white.png")
k=s.gO(e8)
W.x(k.a,k.b,new F.h_(e8),!1,H.r(k,0))
s=s.gP(e8)
W.x(s.a,s.b,new F.h0(e8),!1,H.r(s,0))
s=e8.style
k=C.a.h(e5)+"px"
s.height=k
s=e8.style
m=C.a.h(m+e5)+"px"
s.right=m
s=e8.style
r=C.a.h(r)+"px"
s.top=r
$.aE=d+e+a2+a1+0+a8+b7+b6+0+c3+d2+d1+d8+d8+d*0.1
J.bg(u.querySelector("#background1"))
J.bg(u.querySelector("#background2"))
J.bg(u.querySelector("#background3"))
u=$.D;(u&&C.c).sj(u,0)
u=$.b5;(u&&C.c).sj(u,0)
u=$.aB;(u&&C.c).sj(u,0)
u=$.b2;(u&&C.c).sj(u,0)
$.b4=[1920,1920,1920]
$.b3=[1594,1236,1154]
e9=$.u
e9.toString
u=$.aE
if(typeof u!=="number")return u.A()
s=u*0.3
F.fH(["./images/background1.png","./images/background2.png","./images/background3.png"],[e9,e9,e9],[u*0.4,s,s])},
ho:{"^":"f:0;",
$1:function(a){F.db()}},
hp:{"^":"f:0;",
$1:function(a){var z,y,x
z=document.documentElement
y=z.clientWidth
y.toString
x=window.innerWidth
x.toString
$.u=Math.max(H.I(y),H.I(x))
z=z.clientHeight
z.toString
x=window.innerHeight
x.toString
$.a8=Math.max(H.I(z),H.I(x))
F.db()}},
hq:{"^":"f:0;",
$1:function(a){var z,y,x,w
z=C.x.gby(window)
y=$.a8
x=window.innerHeight
x.toString
$.a8=x
if(typeof x!=="number")return x.aI()
if(typeof y!=="number")return H.P(y)
w=$.be
if(typeof w!=="number")return H.P(w)
F.hv((x-y+z-w)*$.aD)
$.be=z}},
fI:{"^":"f:0;a,b,c,d",
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
fS:{"^":"f:0;a",
$1:function(a){J.M(this.a,"./images/google_play_logo_color.png")}},
fT:{"^":"f:0;a",
$1:function(a){J.M(this.a,"./images/google_play_logo_white.png")}},
fU:{"^":"f:0;a",
$1:function(a){J.M(this.a,"./images/amazon_logo_color.png")}},
fV:{"^":"f:0;a",
$1:function(a){J.M(this.a,"./images/amazon_logo_white.png")}},
fW:{"^":"f:0;a",
$1:function(a){J.M(this.a,"./images/samsung_logo_color.png")}},
fX:{"^":"f:0;a",
$1:function(a){J.M(this.a,"./images/samsung_logo_white.png")}},
fY:{"^":"f:0;a",
$1:function(a){J.M(this.a,"./images/mail_color.png")}},
fZ:{"^":"f:0;a",
$1:function(a){J.M(this.a,"./images/mail_white.png")}},
h_:{"^":"f:0;a",
$1:function(a){J.M(this.a,"./images/facebook_color.png")}},
h0:{"^":"f:0;a",
$1:function(a){J.M(this.a,"./images/facebook_white.png")}}},1]]
setupProgram(dart,0)
J.m=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ce.prototype
return J.cd.prototype}if(typeof a=="string")return J.aN.prototype
if(a==null)return J.e2.prototype
if(typeof a=="boolean")return J.e1.prototype
if(a.constructor==Array)return J.au.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aw.prototype
return a}if(a instanceof P.a)return a
return J.b8(a)}
J.J=function(a){if(typeof a=="string")return J.aN.prototype
if(a==null)return a
if(a.constructor==Array)return J.au.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aw.prototype
return a}if(a instanceof P.a)return a
return J.b8(a)}
J.b7=function(a){if(a==null)return a
if(a.constructor==Array)return J.au.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aw.prototype
return a}if(a instanceof P.a)return a
return J.b8(a)}
J.h5=function(a){if(typeof a=="number")return J.av.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.aW.prototype
return a}
J.h6=function(a){if(typeof a=="number")return J.av.prototype
if(typeof a=="string")return J.aN.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.aW.prototype
return a}
J.E=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aw.prototype
return a}if(a instanceof P.a)return a
return J.b8(a)}
J.a9=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.h6(a).a2(a,b)}
J.X=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.m(a).n(a,b)}
J.di=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.h5(a).ab(a,b)}
J.bO=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.hl(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.J(a).i(a,b)}
J.dj=function(a,b,c,d){return J.E(a).bU(a,b,c,d)}
J.dk=function(a,b,c,d){return J.E(a).c9(a,b,c,d)}
J.dl=function(a,b,c){return J.E(a).ca(a,b,c)}
J.bf=function(a,b,c){return J.J(a).ck(a,b,c)}
J.aF=function(a,b){return J.b7(a).w(a,b)}
J.aq=function(a){return J.E(a).gJ(a)}
J.R=function(a){return J.m(a).gp(a)}
J.aG=function(a){return J.b7(a).gu(a)}
J.aa=function(a){return J.J(a).gj(a)}
J.dm=function(a,b){return J.b7(a).L(a,b)}
J.bg=function(a){return J.b7(a).cL(a)}
J.dn=function(a,b){return J.E(a).cO(a,b)}
J.M=function(a,b){return J.E(a).sv(a,b)}
J.S=function(a){return J.m(a).h(a)}
var $=I.p
C.h=W.dw.prototype
C.o=J.e.prototype
C.c=J.au.prototype
C.e=J.cd.prototype
C.d=J.ce.prototype
C.a=J.av.prototype
C.f=J.aN.prototype
C.w=J.aw.prototype
C.m=J.eh.prototype
C.i=J.aW.prototype
C.x=W.eL.prototype
C.n=new P.eW()
C.b=new P.fr()
C.j=new P.as(0)
C.p=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.q=function(hooks) {
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
C.k=function(hooks) { return hooks; }

C.r=function(getTagFallback) {
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
C.t=function() {
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
C.u=function(hooks) {
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
C.v=function(hooks) {
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
C.l=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
$.cp="$cachedFunction"
$.cq="$cachedInvocation"
$.N=0
$.ab=null
$.bS=null
$.bJ=null
$.cZ=null
$.dc=null
$.b6=null
$.ba=null
$.bK=null
$.a3=null
$.al=null
$.am=null
$.bF=!1
$.l=C.b
$.c5=0
$.c0=null
$.c_=null
$.bZ=null
$.bY=null
$.u=null
$.a8=null
$.aE=null
$.aD=0.2
$.be=null
$.D=null
$.b5=null
$.aB=null
$.b4=null
$.b3=null
$.b2=null
$.dg=null
$.bI=null
$.bL=null
$.d9=null
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
I.$lazy(y,x,w)}})(["bX","$get$bX",function(){return H.d4("_$dart_dartClosure")},"bm","$get$bm",function(){return H.d4("_$dart_js")},"c9","$get$c9",function(){return H.dY()},"ca","$get$ca",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.c5
$.c5=z+1
z="expando$key$"+z}return new P.dG(null,z)},"cz","$get$cz",function(){return H.O(H.aV({
toString:function(){return"$receiver$"}}))},"cA","$get$cA",function(){return H.O(H.aV({$method$:null,
toString:function(){return"$receiver$"}}))},"cB","$get$cB",function(){return H.O(H.aV(null))},"cC","$get$cC",function(){return H.O(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"cG","$get$cG",function(){return H.O(H.aV(void 0))},"cH","$get$cH",function(){return H.O(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"cE","$get$cE",function(){return H.O(H.cF(null))},"cD","$get$cD",function(){return H.O(function(){try{null.$method$}catch(z){return z.message}}())},"cJ","$get$cJ",function(){return H.O(H.cF(void 0))},"cI","$get$cI",function(){return H.O(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bA","$get$bA",function(){return P.eN()},"aL","$get$aL",function(){var z,y
z=P.aR
y=new P.a1(0,P.eM(),null,[z])
y.bS(null,z)
return y},"ao","$get$ao",function(){return[]},"bW","$get$bW",function(){return{}}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1,args:[,]},{func:1},{func:1,v:true},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.a],opt:[P.ay]},{func:1,ret:P.a0,args:[P.j]},{func:1,args:[,P.a0]},{func:1,args:[P.a0]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,],opt:[,]},{func:1,v:true,args:[,P.ay]},{func:1,args:[,,]},{func:1,v:true,args:[P.a]}]
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
if(x==y)H.hA(d||a)
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
Isolate.y=a.y
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.de(F.d8(),b)},[])
else (function(b){H.de(F.d8(),b)})([])})})()