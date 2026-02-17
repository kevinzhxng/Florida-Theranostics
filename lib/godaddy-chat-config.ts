/**
 * GoDaddy Website Chat (Reamaze) configuration
 *
 * Paste your inline script from GoDaddy here (the part between <script> and </script>,
 * not the loader script). Get it from: GoDaddy → Conversations → Settings → Website Chat → Copy Code.
 */
export const GODADDY_CHAT_LOADER_URL =
  "https://cdn.reamaze.com/assets/reamaze-loader.js";

export const GODADDY_CHAT_INLINE_SCRIPT = `
  var _support = _support || { 'ui': {}, 'user': {} };
  _support['account'] = 'a9c98db7-4ed1-4ea9-8e5e-5a7d8c8a7dbe';
  _support['ui']['contactMode'] = 'mixed';
  _support['ui']['enableKb'] = 'true';
  _support['ui']['mailbox'] = '719759';
  _support['ui']['styles'] = {
    widgetColor: 'rgba(16, 162, 197, 1)',
    gradient: true,
  };
  _support['ui']['shoutboxFacesMode'] = '';
  _support['ui']['widget'] = {
    allowBotProcessing: 'true',
    slug: 'florida-theranostics-80297527c2cbe4d5',
    label: {
      text: 'Let us know if you have any questions! 😊',
      mode: "notification",
      delay: 2,
      duration: 30,
      primary: '',
      secondary: '',
      sound: true,
    },
    position: 'bottom-right'
  };
  _support['ui']['overrides'] = _support['ui']['overrides'] || {};
  _support['ui']['overrides']['confirmationMessage'] = 'Please dial us at (561) 847-3797!';
  _support['apps'] = {
    recentConversations: {},
    faq: {"enabled":true}
  };
`;
