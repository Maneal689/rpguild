let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/work/projects/rpguild/src
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +70 App.tsx
badd +1 services/firebase-admin.js
badd +21 services/firebase.js
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
badd +5 components/AuthRoute.tsx
badd +6 App.test.tsx
badd +22 components/Carousel/Carousel.js
badd +5 store/character.ts
badd +5 components/Navbar/index.js
badd +7 components/Navbar/Navbar.js
badd +6 components/Navbar/navbar.module.css
badd +3 styles/dashboard.module.scss
badd +7 components/Tabs/index.js
badd +13 components/Tabs/Tab.tsx
badd +1 components/Tabs/TabToggler.tsx
badd +3 components/CharactersTab/index.ts
badd +43 components/CharactersTab/CharactersTab.tsx
badd +2 components/Selection/index.ts
badd +85 components/Selection/Selection.tsx
badd +9 types/Quest.ts
badd +53 pages/Quest.tsx
badd +55 pages/CreateQuest.tsx
badd +3 components/ApplyQuest/index.ts
badd +1 components/ApplyQuest/ApplyQuest.tsx
badd +3 components/SiteNavbar/index.ts
badd +14 components/SiteNavbar/SiteNavbar.tsx
badd +1 components/ApplyQuest/CharacterTile.tsx
badd +9 pages/ApplyQuest.tsx
badd +10 components/CharacterTile/CharacterTile.tsx
badd +99 components/QuestTile/QuestTile.tsx
badd +91 pages/QuestList.tsx
badd +141 components/QuestTile/style.module.scss
badd +1 helpers/quest.ts
badd +3 helpers/questListReducer.ts
badd +11 App.css
badd +45 styles/QuestList.module.scss
badd +26 components/SignText.tsx
badd +7 components/QuestTile/index.ts
badd +14 components/QuestTile/SelectedQuestTileWrapper.tsx
badd +29 components/QuestTile/HelpTile.tsx
badd +0 components/QuestTile/Controls.tsx
argglobal
%argdel
$argadd App.tsx
set stal=2
edit components/QuestTile/HelpTile.tsx
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 104 + 104) / 208)
exe 'vert 2resize ' . ((&columns * 103 + 104) / 208)
argglobal
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=1
setlocal fml=1
setlocal fdn=20
setlocal fen
11
normal! zo
13
normal! zo
15
normal! zo
23
normal! zo
24
normal! zo
29
normal! zo
35
normal! zo
36
normal! zo
40
normal! zo
43
normal! zo
47
normal! zo
50
normal! zo
56
normal! zo
59
normal! zo
62
normal! zo
65
normal! zo
68
normal! zo
71
normal! zo
39
normal! zo
43
normal! zo
47
normal! zo
50
normal! zo
56
normal! zo
59
normal! zo
62
normal! zo
65
normal! zo
68
normal! zo
71
normal! zo
43
normal! zo
47
normal! zo
50
normal! zo
56
normal! zo
59
normal! zo
62
normal! zo
65
normal! zo
68
normal! zo
71
normal! zo
46
normal! zo
50
normal! zo
56
normal! zo
59
normal! zo
62
normal! zo
65
normal! zo
68
normal! zo
71
normal! zo
50
normal! zo
56
normal! zo
59
normal! zo
62
normal! zo
65
normal! zo
68
normal! zo
71
normal! zo
53
normal! zo
57
normal! zo
59
normal! zo
62
normal! zo
65
normal! zo
68
normal! zo
71
normal! zo
60
normal! zo
61
normal! zo
64
normal! zo
67
normal! zo
70
normal! zo
73
normal! zo
76
normal! zo
let s:l = 59 - ((40 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
59
normal! 015|
wincmd w
argglobal
if bufexists("components/QuestTile/style.module.scss") | buffer components/QuestTile/style.module.scss | else | edit components/QuestTile/style.module.scss | endif
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=6
setlocal fml=1
setlocal fdn=20
setlocal fen
4
normal! zo
14
normal! zo
134
normal! zo
135
normal! zo
136
normal! zo
let s:l = 142 - ((22 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
142
normal! 025|
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 104 + 104) / 208)
exe 'vert 2resize ' . ((&columns * 103 + 104) / 208)
tabedit components/QuestTile/Controls.tsx
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
setlocal fdl=6
setlocal fml=1
setlocal fdn=20
setlocal fen
23
normal! zo
104
normal! zo
107
normal! zo
116
normal! zo
let s:l = 131 - ((27 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
131
normal! 028|
tabedit pages/QuestList.tsx
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
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
1
normal! zo
18
normal! zo
26
normal! zo
38
normal! zo
39
normal! zo
48
normal! zo
55
normal! zo
56
normal! zo
59
normal! zo
61
normal! zo
73
normal! zo
74
normal! zo
75
normal! zo
89
normal! zo
92
normal! zo
93
normal! zo
100
normal! zo
109
normal! zo
113
normal! zo
114
normal! zo
117
normal! zo
125
normal! zo
126
normal! zo
127
normal! zo
30
normal! zo
42
normal! zo
43
normal! zo
48
normal! zo
55
normal! zo
56
normal! zo
59
normal! zo
61
normal! zo
73
normal! zo
74
normal! zo
75
normal! zo
89
normal! zo
92
normal! zo
93
normal! zo
100
normal! zo
109
normal! zo
113
normal! zo
114
normal! zo
117
normal! zo
125
normal! zo
126
normal! zo
127
normal! zo
55
normal! zo
56
normal! zo
59
normal! zo
61
normal! zo
73
normal! zo
74
normal! zo
75
normal! zo
89
normal! zo
92
normal! zo
93
normal! zo
100
normal! zo
109
normal! zo
113
normal! zo
114
normal! zo
117
normal! zo
125
normal! zo
126
normal! zo
127
normal! zo
52
normal! zo
57
normal! zo
59
normal! zo
61
normal! zo
73
normal! zo
74
normal! zo
75
normal! zo
89
normal! zo
92
normal! zo
93
normal! zo
100
normal! zo
109
normal! zo
113
normal! zo
114
normal! zo
117
normal! zo
125
normal! zo
126
normal! zo
127
normal! zo
59
normal! zo
60
normal! zo
63
normal! zo
65
normal! zo
73
normal! zo
74
normal! zo
75
normal! zo
89
normal! zo
92
normal! zo
93
normal! zo
100
normal! zo
109
normal! zo
113
normal! zo
114
normal! zo
117
normal! zo
125
normal! zo
126
normal! zo
127
normal! zo
74
normal! zo
74
normal! zo
75
normal! zo
89
normal! zo
92
normal! zo
93
normal! zo
100
normal! zo
109
normal! zo
113
normal! zo
114
normal! zo
117
normal! zo
125
normal! zo
126
normal! zo
127
normal! zo
75
normal! zo
75
normal! zo
77
normal! zo
78
normal! zo
79
normal! zo
89
normal! zo
92
normal! zo
93
normal! zo
100
normal! zo
109
normal! zo
113
normal! zo
114
normal! zo
117
normal! zo
125
normal! zo
126
normal! zo
127
normal! zo
101
normal! zo
93
normal! zo
96
normal! zo
97
normal! zo
109
normal! zo
113
normal! zo
114
normal! zo
117
normal! zo
125
normal! zo
126
normal! zo
127
normal! zo
104
normal! zo
113
normal! zo
114
normal! zo
117
normal! zo
125
normal! zo
126
normal! zo
127
normal! zo
125
normal! zo
126
normal! zo
127
normal! zo
113
normal! zo
114
normal! zo
117
normal! zo
125
normal! zo
126
normal! zo
127
normal! zo
113
normal! zo
117
normal! zo
118
normal! zo
121
normal! zo
127
normal! zo
129
normal! zo
130
normal! zo
131
normal! zo
let s:l = 91 - ((38 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
91
normal! 059|
tabnext 1
set stal=1
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
