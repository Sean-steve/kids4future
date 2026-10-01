"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export type AdminRole = "admin" | "content_editor" | "safeguarding_reviewer" | "finance_reviewer" | "viewer";
export type AdminProfile = { role: AdminRole; display_name: string | null; is_active: boolean };

export function useAdminSession() {
  const client = useMemo(() => getSupabaseBrowserClient(), []);
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(() => Boolean(client));
  const [error, setError] = useState("");

  const loadProfile = useCallback(async (uid: string) => {
    if (!client) return;
    setLoading(true);
    setError("");
    const { data, error: profileError } = await client
      .from("admin_profiles")
      .select("role,display_name,is_active")
      .eq("user_id", uid)
      .maybeSingle();

    if (profileError || !data?.is_active) {
      setProfile(null);
      setError("This account does not have an active FutureRise staff role.");
      setLoading(false);
      return;
    }

    setProfile(data as AdminProfile);
    setLoading(false);
  }, [client]);

  useEffect(() => {
    if (!client) return;

    client.auth.getSession().then(({ data }) => {
      const id = data.session?.user.id ?? null;
      setUserId(id);
      if (id) void loadProfile(id);
      else setLoading(false);
    });

    const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
      const id = session?.user.id ?? null;
      setUserId(id);
      if (id) void loadProfile(id);
      else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [client, loadProfile]);

  return { client, userId, profile, loading, error, refreshProfile: loadProfile };
}
