let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/work/projects/rpguild/src
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +76 App.tsx
badd +1 services/firebase-admin.js
badd +13 services/firebase.js
badd +9 helpers/auth.js
badd +11 store/index.ts
badd +1 store/usersReducer.ts
badd +13 store/userReducer.ts
badd +8 pages/Home.tsx
badd +99 ~/.config/nvim/plugins.vim
badd +1 ~/.config/nvim/ft.vim
badd +99 ~/.vimrc
badd +19 pages/Dashboard.tsx
badd +1 index.tsx
badd +1 store/user.ts
badd +6 components/LoginRoute.tsx
badd +2 components/AuthRoute.tsx
badd +6 App.test.tsx
badd +22 components/Carousel/Carousel.js
badd +5 store/character.ts
badd +4 components/Navbar/index.js
badd +22 components/Navbar/Navbar.js
badd +6 components/Navbar/navbar.module.css
badd +3 styles/dashboard.module.scss
badd +7 components/Tabs/index.js
badd +13 components/Tabs/Tab.tsx
badd +1 components/Tabs/TabToggler.tsx
badd +3 components/CharactersTab/index.ts
badd +43 components/CharactersTab/CharactersTab.tsx
badd +2 components/Selection/index.ts
badd +85 components/Selection/Selection.tsx
badd +2 types/Quest.ts
badd +210 pages/Quest.tsx
badd +98 pages/CreateQuest.tsx
badd +3 components/ApplyQuest/index.ts
badd +1 components/ApplyQuest/ApplyQuest.tsx
badd +3 components/SiteNavbar/index.ts
badd +18 components/SiteNavbar/SiteNavbar.tsx
badd +1 components/ApplyQuest/CharacterTile.tsx
badd +137 pages/ApplyQuest.tsx
badd +10 components/CharacterTile/CharacterTile.tsx
badd +45 components/QuestTile/QuestTile.tsx
badd +172 pages/QuestList.tsx
badd +115 components/QuestTile/style.module.scss
badd +48 helpers/quest.ts
badd +76 helpers/questListReducer.ts
badd +7 App.css
badd +69 styles/QuestList.module.scss
badd +26 components/SignText.tsx
badd +1 components/QuestTile/index.ts
badd +1 components/QuestTile/SelectedQuestTileWrapper.tsx
badd +88 components/QuestTile/HelpTile.tsx
badd +134 components/QuestTile/Controls.tsx
badd +157 pages/Selection.tsx
badd +19 components/CharacterTile/Controls.tsx
badd +1 components/QuestRooms/QuestRooms.tsx
badd +8 types/Character.ts
badd +24 hooks/useInputs.ts
badd +5 pages/CreateCharacter.tsx
badd +2 styles/CreateCharacter.module.scss
badd +70 styles/Selection.module.scss
badd +3 styles/ApplyQuest.module.scss
badd +90 styles/CreateQuest.module.scss
badd +6 components/Loader/Loader.tsx
badd +6 components/CharacterTile/style.module.scss
badd +3 components/Field/index.ts
badd +81 components/Field/Field.tsx
badd +17 components/Field/style.module.scss
badd +8 styles/Icon.styled.tsx
badd +10 styles/Content.styled.tsx
argglobal
%argdel
$argadd App.tsx
edit components/QuestRooms/QuestRooms.tsx
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=4
setlocal fml=1
setlocal fdn=20
setlocal fen
15
normal! zo
26
normal! zo
34
normal! zo
35
normal! zo
77
normal! zo
88
normal! zo
let s:l = 40 - ((31 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
40
normal! 05|
lcd ~/work/projects/rpguild/src
tabnext 1
if exists('s:wipebuf') && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 winminheight=1 winminwidth=1 shortmess=filnxtToOF
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
let g:this_session = v:this_session
let g:this_obsession = v:this_session
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
