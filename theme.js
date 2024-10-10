const themeStyles = {
    light: {
        background: '#ffffff',
        color: '#000000',
    },
    dark: {
        background: '#333333',
        color: '#FFF000',
    },
    desert: {
        background: '#EDC9A8',
        color: '#000000',
    },
    jungle: {
        background: '#4B8A3D',
        color: '#000000',
    },
    ocean: {
        background: '#1E90FF', 
        color: '#000000',        
    },
    mountain: {
        background: '#8B4513',   
        color: '#000000',        
    }
};

const applyTheme = (theme) => {
    if (themeStyles[theme]) {
        document.body.style.backgroundColor = themeStyles[theme].background;
        document.body.style.color = themeStyles[theme].color;
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.backgroundColor = themeStyles[theme].background;
            button.style.color = themeStyles[theme].color;
        });
    }
};

// Load the selected theme
document.getElementById('themeSelector').addEventListener('change', function() {
    applyTheme(this.value);
});