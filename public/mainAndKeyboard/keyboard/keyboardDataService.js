myApp.factory('keyboardData', function() {
	return [
		{
			rowNumber: 'row1',
			keys: [
				{
					key: '`',
					class1: 'tilde',
					class2: 'lpKey',
					conditional1: '~',
					conditional2: '`',
					contents: '~ `'
				},
				{
					key: '1',
					class1: 'one',
					class2: 'lpKey',
					conditional1: '!',
					conditional2: '1',
					contents: '! 1'
				},
				{
					key: '2',
					class1: 'two',
					class2: 'lrKey',
					conditional1: '@',
					conditional2: '2',
					contents: '@ 2'
				},
				{
					key: '3',
					conditional1: '#',
					conditional2: '3',
					contents: '# 3',
					class1: 'three',
					class2: 'lmKey'
				},
				{
					key: '4',
					conditional1: '$',
					conditional2: '4',
					contents: '$ 4',
					class1: 'four',
					class2: 'liKey'
				},
				{
					key: '5',
					conditional1: '%',
					conditional2: '5',
					contents: '% 5',
					class1: 'five',
					class2: 'liKey'
				},
				{
					key: '6',
					conditional1: '^',
					conditional2: '6',
					contents: '^ 6',
					class1: 'six',
					class2: 'riKey'
				},
				{
					key: '7',
					conditional1: '&',
					conditional2: '7',
					contents: '& 7',
					class1: 'seven',
					class2: 'riKey'
				},
				{
					key: '8',
					conditional1: '*',
					conditional2: '8',
					contents: '* 8',
					class1: 'eight',
					class2: 'rmKey'
				},
				{
					key: '9',
					conditional1: '(',
					conditional2: '9',
					contents: '( 9',
					class1: 'nine',
					class2: 'rrKey'
				},
				{
					key: '0',
					conditional1: ')',
					conditional2: '0',
					contents: ') 0',
					class1: 'zero',
					class2: 'rpKey'
				},
				{
					key: '-',
					conditional1: '_',
					conditional2: '-',
					contents: '_ -',
					class1: 'dash',
					class2: 'rpKey'
				},
				{
					key: '=',
					conditional1: '+',
					conditional2: '=',
					contents: '+ =',
					class1: 'equals',
					class2: 'rpKey'
				},
				{
					key: 'delete',
					special: true,
					conditional1: '',
					conditional2: '',
					contents: 'delete',
					class1: 'delete',
					class2: 'rpKey'
				}
			]
		},
		{
			rowNumber: 'row2',
			keys: [
				{
					key: 'tab',
					conditional1: 'false',
					conditional2: 'false',
					contents: 'tab',
					class1: 'tab',
					class2: 'lpKey'
				},
				{
					key: 'q',
					class1: 'q',
					class2: 'lpKey',
					conditional1: 'q',
					conditional2: 'Q',
					contents: 'Q'
				},
				{
					key: 'w',
					conditional1: 'w',
					conditional2: 'W',
					contents: 'W',
					class1: 'w',
					class2: 'lrKey'
				},
				{
					key: 'e',
					conditional1: 'e',
					conditional2: 'E',
					contents: 'E',
					class1: 'e',
					class2: 'lmKey'
				},
				{
					key: 'r',
					conditional1: 'r',
					conditional2: 'R',
					contents: 'R',
					class1: 'r',
					class2: 'liKey'
				},
				{
					key: 't',
					conditional1: 't',
					conditional2: 'T',
					contents: 'T',
					class1: 't',
					class2: 'liKey'
				},
				{
					key: 'y',
					conditional1: 'y',
					conditional2: 'Y',
					contents: 'Y',
					class1: 'y',
					class2: 'riKey'
				},
				{
					key: 'u',
					conditional1: 'U',
					conditional2: 'u',
					contents: 'U',
					class1: 'u',
					class2: 'riKey'
				},
				{
					key: 'i',
					conditional1: 'I',
					conditional2: 'i',
					contents: 'I',
					class1: 'i',
					class2: 'rmKey'
				},
				{
					key: 'o',
					conditional1: 'O',
					conditional2: 'o',
					contents: 'O',
					class1: 'o',
					class2: 'rrKey'
				},
				{
					key: 'p',
					conditional1: 'P',
					conditional2: 'p',
					contents: 'P',
					class1: 'p',
					class2: 'rpKey'
				},
				{
					key: '[',
					conditional1: '[',
					conditional2: '{',
					contents: '{ [',
					class1: 'leftBracket',
					class2: 'rpKey'
				},
				{
					key: ']',
					conditional1: '}',
					conditional2: ']',
					contents: '} ]',
					class1: 'rightBracket',
					class2: 'rpKey'
				},
				{
					key: '|',
					conditional1: '|',
					conditional2: '\\',
					contents: '\\ |',
					class1: 'backslash',
					class2: 'rpKey'
				}
			]
		},
		{
			rowNumber: 'row3',
			keys: [
				{
					key: 'capslock',
					conditional1: 'false',
					conditional2: 'false',
					contents: 'caps lock',
					class1: 'caps',
					class2: 'lpKey'
				},
				{
					key: 'a',
					conditional1: 'A',
					conditional2: 'a',
					contents: 'A',
					class1: 'a',
					class2: 'lpKey'
				},
				{
					key: 's',
					conditional1: 'S',
					conditional2: 's',
					contents: 'S',
					class1: 's',
					class2: 'lrKey'
				},
				{
					key: 'd',
					conditional1: 'D',
					conditional2: 'd',
					contents: 'D',
					class1: 'd',
					class2: 'lmKey'
				},
				{
					key: 'f',
					conditional1: 'F',
					conditional2: 'f',
					contents: 'F',
					class1: 'f',
					class2: 'liKey'
				},
				{
					key: 'g',
					conditional1: 'G',
					conditional2: 'g',
					contents: 'G',
					class1: 'g',
					class2: 'liKey'
				},
				{
					key: 'h',
					conditional1: 'h',
					conditional2: 'H',
					contents: 'H',
					class1: 'H',
					class2: 'riKey'
				},
				{
					key: 'j',
					conditional1: 'J',
					conditional2: 'j',
					contents: 'J',
					class1: 'j',
					class2: 'riKey'
				},
				{
					key: 'k',
					conditional1: 'K',
					conditional2: 'k',
					contents: 'K',
					class1: 'k',
					class2: 'rmKey'
				},
				{
					key: 'l',
					conditional1: 'L',
					conditional2: 'l',
					contents: 'L',
					class1: 'l',
					class2: 'rrKey'
				},
				{
					key: ';',
					conditional1: ':',
					conditional2: ';',
					contents: ': ;',
					class1: 'semicolon',
					class2: 'rpKey'
				},
				{
					key: "'",
					conditional1: '"',
					conditional2: "'",
					contents: '" \'',
					class1: 'quote',
					class2: 'rpKey'
				},
				{
					key: 'enter',
					conditional1: 'false',
					conditional2: 'false',
					contents: 'return',
					class1: 'enter',
					class2: 'rpKey'
				}
			]
		},
		{
			rowNumber: 'row4',
			keys: [
				{
					key: 'leftShift',
					special: true,
					contents: 'shift',
					class1: 'leftShift',
					class2: 'lpKey'
				},
				{
					key: 'z',
					conditional1: 'Z',
					conditional2: 'z',
					contents: 'Z',
					class1: 'z',
					class2: 'lpKey'
				},
				{
					key: 'x',
					conditional1: 'X',
					conditional2: 'x',
					contents: 'X',
					class1: 'x',
					class2: 'lrKey'
				},
				{
					key: 'c',
					conditional1: 'C',
					conditional2: 'c',
					contents: 'C',
					class1: 'c',
					class2: 'lmKey'
				},
				{
					key: 'v',
					conditional1: 'V',
					conditional2: 'v',
					contents: 'V',
					class1: 'v',
					class2: 'liKey'
				},
				{
					key: 'b',
					conditional1: 'B',
					conditional2: 'b',
					contents: 'B',
					class1: 'b',
					class2: 'liKey'
				},
				{
					key: 'n',
					conditional1: 'N',
					conditional2: 'n',
					contents: 'N',
					class1: 'n',
					class2: 'riKey'
				},
				{
					key: 'm',
					conditional1: 'M',
					conditional2: 'm',
					contents: 'M',
					class1: 'm',
					class2: 'riKey'
				},
				{
					key: ',',
					conditional1: '<',
					conditional2: ',',
					contents: '< ,',
					class1: 'comma',
					class2: 'rmKey'
				},
				{
					key: '.',
					conditional1: '>',
					conditional2: '.',
					contents: '> .',
					class1: 'period',
					class2: 'rrKey'
				},
				{
					key: '/',
					conditional1: '?',
					conditional2: '/',
					contents: '? /',
					class1: 'slash',
					class2: 'rpKey'
				},
				{
					key: 'rightShift',
					special: true,
					contents: 'shift',
					class1: 'rightShift',
					class2: 'rpKey'
				}
			]
		},
		{
			rowNumber: 'row5',
			keys: [
				{
					key: 'fn',
					contents: 'fn',
					class1: 'fn',
					class2: 'lpKey'
				},
				{
					key: 'ctrl',
					contents: 'ctrl',
					class1: 'ctrl',
					class2: 'lpKey'
				},
				{
					key: 'alt',
					contents: 'alt',
					class1: 'alt',
					class2: 'lpKey'
				},
				{
					key: 'cmd',
					contents: 'cmd',
					class1: 'cmd',
					class2: 'ltKey'
				},
				{
					key: 'space',
					special: true,
					conditional1: '',
					conditional2: '',
					contents: '',
					class1: '',
					class2: ''
				},
				{
					key: 'cmd',
					contents: 'cmd',
					class1: 'cmd',
					class2: 'rtKey'
				},
				{
					key: 'alt',
					contents: 'alt',
					class1: 'alt',
					class2: 'rrKey'
				},
				{
					key: 'button',
					special: true,
					contents: 'Search Song',
					class1: '',
					class2: ''
				}
			]
		}
	];
})