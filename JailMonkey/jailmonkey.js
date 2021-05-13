console.log("----------------");
console.log("SCRIPT INJECTED!");
console.log("----------------");

for (var className in ObjC.classes)
{
   if (ObjC.classes.hasOwnProperty(className))
        {
           if(/jail/i.test(className))
            {
                console.log("[*]Detected class\n" + className);
                
                var funcName = eval('ObjC.classes.' + className + '.$methods');
                for (var i = 0; i < funcName.length; i++)
                    {
                        if(/jail/i.test(funcName[i]))
                        {
                            console.log("[*]Function Detected In " + className + "\n" + funcName[i]);
                            const classj = eval('ObjC.classes.'+ className);
                            Interceptor.attach(classj[funcName[i]].implementation, {
                            onLeave: function (retval) {
                                console.log("\n[*]Return value\n" + retval);
                                retval.replace(0x0);
                                console.log("\n[*]New value\n" + retval);
                                }});
                                }
                        }
        }
    }
}
