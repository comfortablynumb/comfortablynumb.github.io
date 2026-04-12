function renderNavbar(containerSelector) {
  var currentPath = window.location.pathname.replace(/\/$/, '') || '';
  var isHomeActive = currentPath === '' || currentPath.startsWith('/posts');
  var activeClass = 'text-emerald-400';
  var inactiveClass = 'text-slate-300 hover:text-white';

  var html = '' +
    '<nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/5">' +
      '<div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">' +
        '<a href="/" class="flex items-center gap-3 group no-underline">' +
          '<img src="/images/logo.jpg" alt="Berug0" class="w-9 h-9 rounded-full ring-2 ring-emerald-400/50 group-hover:ring-emerald-400 transition-all duration-300">' +
          '<span class="text-white font-bold text-lg tracking-tight">Berug0</span>' +
        '</a>' +
        '<div class="flex items-center gap-8">' +
          '<div class="hidden sm:flex items-center gap-6 text-sm font-medium">' +
            '<a href="/" class="' + (isHomeActive ? activeClass : inactiveClass) + ' transition-colors duration-300 no-underline">Home</a>' +
            '<a href="https://comfortablynumb.github.io/berugo-dev/" class="' + inactiveClass + ' transition-colors duration-300 no-underline">Dev Tools</a>' +
          '</div>' +
          '<div class="flex items-center gap-3">' +
            '<a href="https://github.com/comfortablynumb" class="text-slate-400 hover:text-white transition-colors duration-300" title="GitHub">' +
              '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>' +
              '</svg>' +
            '</a>' +
            '<button onclick="toggleMobileMenu()" class="sm:hidden text-slate-400 hover:text-white transition-colors">' +
              '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>' +
              '</svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div id="mobile-menu" class="hidden sm:hidden border-t border-white/5 px-6 py-4 space-y-3 text-sm font-medium">' +
        '<a href="/" class="block ' + (isHomeActive ? activeClass : inactiveClass) + ' no-underline">Home</a>' +
        '<a href="https://comfortablynumb.github.io/berugo-dev/" class="block ' + inactiveClass + ' no-underline">Dev Tools</a>' +
      '</div>' +
    '</nav>';

  $(containerSelector).html(html);
}

function toggleMobileMenu() {
  $('#mobile-menu').toggleClass('hidden');
}

function renderFooter(containerSelector) {
  var html = '' +
    '<footer class="border-t border-white/5 mt-20">' +
      '<div class="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">' +
        '<p>&copy; ' + new Date().getFullYear() + ' Berug0. All rights reserved.</p>' +
        '<div class="flex items-center gap-4">' +
          '<a href="https://github.com/comfortablynumb" class="hover:text-slate-300 transition-colors duration-300 no-underline">GitHub</a>' +
        '</div>' +
      '</div>' +
    '</footer>';

  $(containerSelector).html(html);
}
