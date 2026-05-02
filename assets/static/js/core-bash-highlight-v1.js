(() => {
  if(!hljs) {
    console.error("HLJS not loaded yet, core bash highlight failed");
    return;
  }

  const bash = hljs.getLanguage('bash');

  bash.contains.unshift({
    className: 'built_in',
    begin: /\b(ehecoatl (core|tenant|app){1}\s?(start|stop|restart|status|log){0,1})\b/
  });

  bash.contains.unshift({
    className: 'built_in',
    begin: /\b(deploy (tenant|app){1})\b/
  }); 

  bash.contains.unshift({
    className: 'built_in',
    begin: /\bbash\b/
  }); 

  bash.contains.unshift({
    className: 'built_in',
    begin: /\bcurl\b/
  }); 

  hljs.registerLanguage('bash', () => bash);

})();