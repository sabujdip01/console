function y1() {
    const [A, tt] = jt.useState(null), b = (S, f) => {
        const connections = Array.isArray(S) ? S : [{ url: S, key: f }];
        tt({
            fbUrl: connections[0].url,
            fbKey: connections[0].key,
            connections
        });
        
    }, d = () => {
        tt(null)
    };
    return A ? r.jsx(p1, {
        fbUrl: A.fbUrl,
        fbKey: A.fbKey,
        connections: A.connections,
        onLogout: d
    }) : r.jsx(s1, {
        onConnect: b
    })
}
Y0.createRoot(document.getElementById("root")).render(r.jsx(y1, {}));

(() => {
    const savedTheme = localStorage.getItem("green-panel-theme");
    const initialTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
    const root = document.documentElement;
    const toggle = document.createElement("button");
    toggle.className = "theme-toggle";
    toggle.type = "button";

    const updateTheme = theme => {
        root.dataset.theme = theme;
        const icon = document.createElement("i");
        icon.className = `fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}`;
        icon.setAttribute("aria-hidden", "true");
        toggle.replaceChildren(icon, document.createTextNode(theme === "dark" ? "Dark" : "Light"));
        toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
        toggle.title = toggle.getAttribute("aria-label");
        localStorage.setItem("green-panel-theme", theme);
    };

    toggle.addEventListener("click", () => updateTheme(root.dataset.theme === "dark" ? "light" : "dark"));
    updateTheme(initialTheme);

    const placeThemeToggle = () => {
        const actions = document.querySelector(".dashboard-header-actions");
        const connection = actions?.querySelector(".connection-status");
        const login = document.querySelector("#root > .min-h-screen:has(.Green-logo--hero)");
        const savedAccountActions = login?.querySelector(".saved-account-actions");
        if (actions && connection) {
            if (toggle.parentElement !== actions) actions.insertBefore(toggle, connection);
        } else if (savedAccountActions) {
            if (toggle.parentElement !== savedAccountActions) savedAccountActions.appendChild(toggle);
        } else if (login && toggle.parentElement !== document.body) {
            document.body.appendChild(toggle);
        }
    };
    placeThemeToggle();
    new MutationObserver(placeThemeToggle).observe(document.body, { childList: true, subtree: true });

    const replaceLoginImage = () => {
        document.querySelectorAll('img[alt="Green photo"]').forEach(image => {
            if (!image.src.endsWith("/img.png")) image.src = "img.png";
        });
        document.querySelectorAll('img[alt="Green logo"]').forEach(image => {
            if (!image.src.endsWith("/img.png")) image.src = "img.png";
        });
    };
    replaceLoginImage();
    new MutationObserver(replaceLoginImage).observe(document.body, { childList: true, subtree: true });

    const enhanceSortDropdown = () => {
        document.querySelectorAll('.console-toolbar select:not([data-customized])').forEach(select => {
            select.dataset.customized = "true";
            const wrapper = document.createElement("div");
            wrapper.className = "console-sort-dropdown";
            const trigger = document.createElement("button");
            trigger.type = "button";
            trigger.className = "console-sort-trigger";
            trigger.setAttribute("aria-haspopup", "listbox");
            trigger.setAttribute("aria-expanded", "false");
            const icon = document.createElement("i");
            icon.className = "fa-solid fa-chevron-down";
            icon.setAttribute("aria-hidden", "true");
            const menu = document.createElement("div");
            menu.className = "console-sort-menu";
            menu.setAttribute("role", "listbox");

            const sync = () => {
                const selected = select.options[select.selectedIndex];
                trigger.firstChild.textContent = selected?.textContent || "Sort";
                menu.querySelectorAll("button").forEach(option => option.classList.toggle("selected", option.dataset.value === select.value));
            };

            [...select.options].forEach(option => {
                const item = document.createElement("button");
                item.type = "button";
                item.dataset.value = option.value;
                item.setAttribute("role", "option");
                item.textContent = option.textContent;
                item.addEventListener("click", () => {
                    select.value = option.value;
                    select.dispatchEvent(new Event("change", { bubbles: true }));
                    sync();
                    menu.classList.remove("open");
                    trigger.setAttribute("aria-expanded", "false");
                });
                menu.appendChild(item);
            });

            trigger.append(document.createTextNode(""), icon);
            trigger.addEventListener("click", event => {
                event.stopPropagation();
                const open = menu.classList.toggle("open");
                trigger.setAttribute("aria-expanded", String(open));
                if (open) {
                    const rect = trigger.getBoundingClientRect();
                    menu.style.position = "fixed";
                    menu.style.top = `${rect.bottom + 6}px`;
                    menu.style.left = `${rect.left}px`;
                    menu.style.width = `${rect.width}px`;
                } else {
                    menu.removeAttribute("style");
                }
            });
            select.addEventListener("change", sync);
            wrapper.append(trigger, menu);
            select.parentElement.insertBefore(wrapper, select);
            select.style.display = "none";
            sync();
        });
    };
    enhanceSortDropdown();
    new MutationObserver(enhanceSortDropdown).observe(document.body, { childList: true, subtree: true });
    document.addEventListener("click", () => {
        document.querySelectorAll(".console-sort-menu.open").forEach(menu => {
            menu.classList.remove("open");
            menu.removeAttribute("style");
        });
        document.querySelectorAll(".console-sort-trigger[aria-expanded=true]").forEach(button => button.setAttribute("aria-expanded", "false"));
    });
})();
