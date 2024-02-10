const SpellList = [	
	{ id: 0, name: "bomb", path: "/spells/Spell_bomb.webp", type: "projectile" },
	{ id: 1, name: "light_bullet", path: "/spells/Spell_light_bullet.webp", type: "projectile" },
	{ id: 2, name: "light_bullet_trigger", path: "/spells/Spell_light_bullet_trigger.webp", type: "projectile" },
	{ id: 3, name: "light_bullet_trigger_2", path: "/spells/Spell_light_bullet_trigger_2.webp", type: "projectile" },
	{ id: 4, name: "light_bullet_timer", path: "/spells/Spell_light_bullet_timer.webp", type: "projectile" },
	{ id: 5, name: "bullet", path: "/spells/Spell_bullet.webp", type: "projectile" },
	{ id: 6, name: "bullet_trigger", path: "/spells/Spell_bullet_trigger.webp", type: "projectile" },
	{ id: 7, name: "bullet_timer", path: "/spells/Spell_bullet_timer.webp", type: "projectile" },
	{ id: 8, name: "heavy_bullet", path: "/spells/Spell_heavy_bullet.webp", type: "projectile" },
	{ id: 9, name: "heavy_bullet_trigger", path: "/spells/Spell_heavy_bullet_trigger.webp", type: "projectile" },
	{ id: 10, name: "heavy_bullet_timer", path: "/spells/Spell_heavy_bullet_timer.webp", type: "projectile" },
	{ id: 11, name: "air_bullet", path: "/spells/Spell_air_bullet.webp", type: "projectile" },
	{ id: 12, name: "slow_bullet", path: "/spells/Spell_slow_bullet.webp", type: "projectile" },
	{ id: 13, name: "slow_bullet_trigger", path: "/spells/Spell_slow_bullet_trigger.webp", type: "projectile" },
	{ id: 14, name: "slow_bullet_timer", path: "/spells/Spell_slow_bullet_timer.webp", type: "projectile" },
	{ id: 15, name: "black_hole", path: "/spells/Spell_black_hole.webp", type: "projectile" },
	{ id: 16, name: "black_hole_timer", path: "/spells/Spell_black_hole_timer.webp", type: "projectile" },
	{ id: 17, name: "black_hole_big", path: "/spells/Spell_black_hole_big.webp", type: "static_projectile" },
	{ id: 18, name: "black_hole_giga", path: "/spells/Spell_black_hole_giga.webp", type: "static_projectile" },
	{ id: 19, name: "tentacle_portal", path: "/spells/Spell_tentacle_portal.webp", type: "projectile" },
	{ id: 20, name: "spitter", path: "/spells/Spell_spitter.webp", type: "projectile" },
	{ id: 21, name: "spitter_timer", path: "/spells/Spell_spitter_timer.webp", type: "projectile" },
	{ id: 22, name: "spitter_green", path: "/spells/Spell_spitter_green.webp", type: "projectile" },
	{ id: 23, name: "spitter_green_timer", path: "/spells/Spell_spitter_green_timer.webp", type: "projectile" },
	{ id: 24, name: "spitter_purple", path: "/spells/Spell_spitter_purple.webp", type: "projectile" },
	{ id: 25, name: "spitter_purple_timer", path: "/spells/Spell_spitter_purple_timer.webp", type: "projectile" },
	{ id: 26, name: "bubbleshot", path: "/spells/Spell_bubbleshot.webp", type: "projectile" },
	{ id: 27, name: "bubbleshot_trigger", path: "/spells/Spell_bubbleshot_trigger.webp", type: "projectile" },
	{ id: 28, name: "disc_bullet", path: "/spells/Spell_disc_bullet.webp", type: "projectile" },
	{ id: 29, name: "disc_bullet_big", path: "/spells/Spell_disc_bullet_big.webp", type: "projectile" },
	{ id: 30, name: "omega_disc_bullet", path: "/spells/Spell_omega_disc_bullet.webp", type: "projectile" },
	{ id: 31, name: "bouncy_orb", path: "/spells/Spell_bouncy_orb.webp", type: "projectile" },
	{ id: 32, name: "bouncy_orb_timer", path: "/spells/Spell_bouncy_orb_timer.webp", type: "projectile" },
	{ id: 33, name: "rubber_ball", path: "/spells/Spell_rubber_ball.webp", type: "projectile" },
	{ id: 34, name: "arrow", path: "/spells/Spell_arrow.webp", type: "projectile" },
	{ id: 35, name: "pollen", path: "/spells/Spell_pollen.webp", type: "projectile" },
	{ id: 36, name: "lance", path: "/spells/Spell_lance.webp", type: "projectile" },
	{ id: 37, name: "rocket", path: "/spells/Spell_rocket.webp", type: "projectile" },
	{ id: 38, name: "rocket_tier_2", path: "/spells/Spell_rocket_tier_2.webp", type: "projectile" },
	{ id: 39, name: "rocket_tier_3", path: "/spells/Spell_rocket_tier_3.webp", type: "projectile" },
	{ id: 40, name: "grenade", path: "/spells/Spell_grenade.webp", type: "projectile" },
	{ id: 41, name: "grenade_trigger", path: "/spells/Spell_grenade_trigger.webp", type: "projectile" },
	{ id: 42, name: "grenade_tier_2", path: "/spells/Spell_grenade_tier_2.webp", type: "projectile" },
	{ id: 43, name: "grenade_tier_3", path: "/spells/Spell_grenade_tier_3.webp", type: "projectile" },
	{ id: 44, name: "grenade_anti", path: "/spells/Spell_grenade_anti.webp", type: "projectile" },
	{ id: 45, name: "grenade_large", path: "/spells/Spell_grenade_large.webp", type: "projectile" },
	{ id: 46, name: "mine", path: "/spells/Spell_mine.webp", type: "projectile" },
	{ id: 47, name: "mine_death_trigger", path: "/spells/Spell_mine_death_trigger.webp", type: "projectile" },
	{ id: 48, name: "pipe_bomb", path: "/spells/Spell_pipe_bomb.webp", type: "projectile" },
	{ id: 49, name: "pipe_bomb_death_trigger", path: "/spells/Spell_pipe_bomb_death_trigger.webp", type: "projectile" },
	{ id: 50, name: "exploding_deer", path: "/spells/Spell_exploding_deer.webp", type: "projectile" },
	{ id: 51, name: "duck_2", path: "/spells/Spell_duck_2.webp", type: "projectile" },
	{ id: 52, name: "worm", path: "/spells/Spell_worm.webp", type: "projectile" },
	{ id: 53, name: "pipe_bomb_detonator", path: "/spells/Spell_pipe_bomb_detonator.webp", type: "static_projectile" },
	{ id: 54, name: "laser", path: "/spells/Spell_laser.webp", type: "projectile" },
	{ id: 55, name: "megalaser", path: "/spells/Spell_megalaser.webp", type: "projectile" },
	{ id: 56, name: "lightning", path: "/spells/Spell_lightning.webp", type: "projectile" },
	{ id: 57, name: "ball_lightning", path: "/spells/Spell_ball_lightning.webp", type: "projectile" },
	{ id: 58, name: "laser_emitter", path: "/spells/Spell_laser_emitter.webp", type: "projectile" },
	{ id: 59, name: "laser_emitter_four", path: "/spells/Spell_laser_emitter_four.webp", type: "projectile" },
	{ id: 60, name: "laser_emitter_cutter", path: "/spells/Spell_laser_emitter_cutter.webp", type: "projectile" },
	{ id: 61, name: "digger", path: "/spells/Spell_digger.webp", type: "projectile" },
	{ id: 62, name: "powerdigger", path: "/spells/Spell_powerdigger.webp", type: "projectile" },
	{ id: 63, name: "chainsaw", path: "/spells/Spell_chainsaw.webp", type: "projectile" },
	{ id: 64, name: "luminous_drill", path: "/spells/Spell_luminous_drill.webp", type: "projectile" },
	{ id: 65, name: "luminous_drill_timer", path: "/spells/Spell_luminous_drill_timer.webp", type: "projectile" },
	{ id: 66, name: "tentacle", path: "/spells/Spell_tentacle.webp", type: "projectile" },
	{ id: 67, name: "tentacle_timer", path: "/spells/Spell_tentacle_timer.webp", type: "projectile" },
	{ id: 68, name: "heal_bullet", path: "/spells/Spell_heal_bullet.webp", type: "projectile" },
	{ id: 69, name: "spiral_shot", path: "/spells/Spell_spiral_shot.webp", type: "projectile" },
	{ id: 70, name: "magic_shield", path: "/spells/Spell_magic_shield.webp", type: "projectile" },
	{ id: 71, name: "big_magic_shield", path: "/spells/Spell_big_magic_shield.webp", type: "projectile" },
	{ id: 72, name: "chain_bolt", path: "/spells/Spell_chain_bolt.webp", type: "projectile" },
	{ id: 73, name: "fireball", path: "/spells/Spell_fireball.webp", type: "projectile" },
	{ id: 74, name: "meteor", path: "/spells/Spell_meteor.webp", type: "projectile" },
	{ id: 75, name: "flamethrower", path: "/spells/Spell_flamethrower.webp", type: "projectile" },
	{ id: 76, name: "iceball", path: "/spells/Spell_iceball.webp", type: "projectile" },
	{ id: 77, name: "slimeball", path: "/spells/Spell_slimeball.webp", type: "projectile" },
	{ id: 78, name: "darkflame", path: "/spells/Spell_darkflame.webp", type: "projectile" },
	{ id: 79, name: "missile", path: "/spells/Spell_missile.webp", type: "projectile" },
	{ id: 80, name: "machinegun_bullet", path: "/spells/Spell_machinegun_bullet.webp", type: "projectile" },
	{ id: 81, name: "pebble", path: "/spells/Spell_pebble.webp", type: "projectile" },
	{ id: 82, name: "dynamite", path: "/spells/Spell_dynamite.webp", type: "projectile" },
	{ id: 83, name: "glitter_bomb", path: "/spells/Spell_glitter_bomb.webp", type: "projectile" },
	{ id: 84, name: "buckshot", path: "/spells/Spell_buckshot.webp", type: "projectile" },
	{ id: 85, name: "freezing_gaze", path: "/spells/Spell_freezing_gaze.webp", type: "projectile" },
	{ id: 86, name: "glowing_bolt", path: "/spells/Spell_glowing_bolt.webp", type: "projectile" },
	{ id: 87, name: "spore_pod", path: "/spells/Spell_spore_pod.webp", type: "projectile" },
	{ id: 88, name: "glue_shot", path: "/spells/Spell_glue_shot.webp", type: "projectile" },
	{ id: 89, name: "bomb_holy", path: "/spells/Spell_bomb_holy.webp", type: "projectile" },
	{ id: 90, name: "bomb_holy_giga", path: "/spells/Spell_bomb_holy_giga.webp", type: "projectile" },
	{ id: 91, name: "propane_tank", path: "/spells/Spell_propane_tank.webp", type: "projectile" },
	{ id: 92, name: "bomb_cart", path: "/spells/Spell_bomb_cart.webp", type: "projectile" },
	{ id: 93, name: "cursed_orb", path: "/spells/Spell_cursed_orb.webp", type: "projectile" },
	{ id: 94, name: "expanding_orb", path: "/spells/Spell_expanding_orb.webp", type: "projectile" },
	{ id: 95, name: "crumbling_earth", path: "/spells/Spell_crumbling_earth.webp", type: "projectile" },
	{ id: 96, name: "summon_rock", path: "/spells/Spell_summon_rock.webp", type: "projectile" },
	{ id: 97, name: "summon_egg", path: "/spells/Spell_summon_egg.webp", type: "projectile" },
	{ id: 98, name: "summon_hollow_egg", path: "/spells/Spell_summon_hollow_egg.webp", type: "projectile" },
	{ id: 99, name: "tntbox", path: "/spells/Spell_tntbox.webp", type: "projectile" },
	{ id: 100, name: "tntbox_big", path: "/spells/Spell_tntbox_big.webp", type: "projectile" },
	{ id: 101, name: "swarm_fly", path: "/spells/Spell_swarm_fly.webp", type: "static_projectile" },
	{ id: 102, name: "swarm_firebug", path: "/spells/Spell_swarm_firebug.webp", type: "static_projectile" },
	{ id: 103, name: "swarm_wasp", path: "/spells/Spell_swarm_wasp.webp", type: "static_projectile" },
	{ id: 104, name: "friend_fly", path: "/spells/Spell_friend_fly.webp", type: "static_projectile" },
	{ id: 105, name: "acidshot", path: "/spells/Spell_acidshot.webp", type: "projectile" },
	{ id: 106, name: "thunderball", path: "/spells/Spell_thunderball.webp", type: "projectile" },
	{ id: 107, name: "firebomb", path: "/spells/Spell_firebomb.webp", type: "projectile" },
	{ id: 108, name: "soil", path: "/spells/Spell_soil.webp", type: "material" },
	{ id: 109, name: "death_cross", path: "/spells/Spell_death_cross.webp", type: "projectile" },
	{ id: 110, name: "death_cross_big", path: "/spells/Spell_death_cross_big.webp", type: "projectile" },
	{ id: 111, name: "infestation", path: "/spells/Spell_infestation.webp", type: "projectile" },
	{ id: 112, name: "wall_horizontal", path: "/spells/Spell_wall_horizontal.webp", type: "static_projectile" },
	{ id: 113, name: "wall_vertical", path: "/spells/Spell_wall_vertical.webp", type: "static_projectile" },
	{ id: 114, name: "wall_square", path: "/spells/Spell_wall_square.webp", type: "static_projectile" },
	{ id: 115, name: "temporary_wall", path: "/spells/Spell_temporary_wall.webp", type: "utility" },
	{ id: 116, name: "temporary_platform", path: "/spells/Spell_temporary_platform.webp", type: "utility" },
	{ id: 117, name: "purple_explosion_field", path: "/spells/Spell_purple_explosion_field.webp", type: "static_projectile" },
	{ id: 118, name: "delayed_spell", path: "/spells/Spell_delayed_spell.webp", type: "static_projectile" },
	{ id: 119, name: "long_distance_cast", path: "/spells/Spell_long_distance_cast.webp", type: "utility" },
	{ id: 120, name: "Teleport_cast", path: "/spells/Spell_Teleport_cast.webp", type: "utility" },
	{ id: 121, name: "super_teleport_cast", path: "/spells/Spell_super_teleport_cast.webp", type: "utility" },
	{ id: 122, name: "mist_radioactive", path: "/spells/Spell_mist_radioactive.webp", type: "projectile" },
	{ id: 123, name: "mist_alcohol", path: "/spells/Spell_mist_alcohol.webp", type: "projectile" },
	{ id: 124, name: "mist_slime", path: "/spells/Spell_mist_slime.webp", type: "projectile" },
	{ id: 125, name: "mist_blood", path: "/spells/Spell_mist_blood.webp", type: "projectile" },
	{ id: 126, name: "circle_fire", path: "/spells/Spell_circle_fire.webp", type: "material" },
	{ id: 127, name: "circle_acid", path: "/spells/Spell_circle_acid.webp", type: "material" },
	{ id: 128, name: "circle_oil", path: "/spells/Spell_circle_oil.webp", type: "material" },
	{ id: 129, name: "circle_water", path: "/spells/Spell_circle_water.webp", type: "material" },
	{ id: 130, name: "material_water", path: "/spells/Spell_material_water.webp", type: "material" },
	{ id: 131, name: "material_oil", path: "/spells/Spell_material_oil.webp", type: "material" },
	{ id: 132, name: "material_blood", path: "/spells/Spell_material_blood.webp", type: "material" },
	{ id: 133, name: "material_acid", path: "/spells/Spell_material_acid.webp", type: "material" },
	{ id: 134, name: "material_cement", path: "/spells/Spell_material_cement.webp", type: "material" },
	{ id: 135, name: "teleport_projectile", path: "/spells/Spell_teleport_projectile.webp", type: "projectile" },
	{ id: 136, name: "teleport_projectile_short", path: "/spells/Spell_teleport_projectile_short.webp", type: "projectile" },
	{ id: 137, name: "teleport_projectile_static", path: "/spells/Spell_teleport_projectile_static.webp", type: "projectile" },
	{ id: 138, name: "Swapper_projectile", path: "/spells/Spell_Swapper_projectile.webp", type: "projectile" },
	{ id: 139, name: "teleport_projectile_closer", path: "/spells/Spell_teleport_projectile_closer.webp", type: "projectile" },
	{ id: 140, name: "nuke", path: "/spells/Spell_nuke.webp", type: "projectile" },
	{ id: 141, name: "nuke_giga", path: "/spells/Spell_nuke_giga.webp", type: "projectile" },
	{ id: 142, name: "fireworks", path: "/spells/Spell_fireworks.webp", type: "projectile" },
	{ id: 143, name: "summon_wandghost", path: "/spells/Spell_summon_wandghost.webp", type: "utility" },
	{ id: 144, name: "touch_gold", path: "/spells/Spell_touch_gold.webp", type: "material" },
	{ id: 145, name: "touch_water", path: "/spells/Spell_touch_water.webp", type: "material" },
	{ id: 146, name: "touch_oil", path: "/spells/Spell_touch_oil.webp", type: "material" },
	{ id: 147, name: "touch_alcohol", path: "/spells/Spell_touch_alcohol.webp", type: "material" },
	{ id: 148, name: "touch_blood", path: "/spells/Spell_touch_blood.webp", type: "material" },
	{ id: 149, name: "touch_smoke", path: "/spells/Spell_touch_smoke.webp", type: "material" },
	{ id: 150, name: "destruction", path: "/spells/Spell_destruction.webp", type: "static_projectile" },
	{ id: 151, name: "burst_2", path: "/spells/Spell_burst_2.webp", type: "multicast" },
	{ id: 152, name: "burst_3", path: "/spells/Spell_burst_3.webp", type: "multicast" },
	{ id: 153, name: "burst_4", path: "/spells/Spell_burst_4.webp", type: "multicast" },
	{ id: 154, name: "burst_8", path: "/spells/Spell_burst_8.webp", type: "multicast" },
	{ id: 155, name: "burst_x", path: "/spells/Spell_burst_x.webp", type: "multicast" },
	{ id: 156, name: "scatter_2", path: "/spells/Spell_scatter_2.webp", type: "multicast" },
	{ id: 157, name: "scatter_3", path: "/spells/Spell_scatter_3.webp", type: "multicast" },
	{ id: 158, name: "scatter_4", path: "/spells/Spell_scatter_4.webp", type: "multicast" },
	{ id: 159, name: "i_shape", path: "/spells/Spell_i_shape.webp", type: "multicast" },
	{ id: 160, name: "y_shape", path: "/spells/Spell_y_shape.webp", type: "multicast" },
	{ id: 161, name: "t_shape", path: "/spells/Spell_t_shape.webp", type: "multicast" },
	{ id: 162, name: "w_shape", path: "/spells/Spell_w_shape.webp", type: "multicast" },
	{ id: 163, name: "circle_shape", path: "/spells/Spell_circle_shape.webp", type: "multicast" },
	{ id: 164, name: "pentagram_shape", path: "/spells/Spell_pentagram_shape.webp", type: "multicast" },
	{ id: 165, name: "spread_reduce", path: "/spells/Spell_spread_reduce.webp", type: "projectile_modifier" },
	{ id: 166, name: "heavy_spread", path: "/spells/Spell_heavy_spread.webp", type: "projectile_modifier" },
	{ id: 167, name: "recharge", path: "/spells/Spell_recharge.webp", type: "projectile_modifier" },
	{ id: 168, name: "lifetime", path: "/spells/Spell_lifetime.webp", type: "projectile_modifier" },
	{ id: 169, name: "lifetime_down", path: "/spells/Spell_lifetime_down.webp", type: "projectile_modifier" },
	{ id: 170, name: "nolla", path: "/spells/Spell_nolla.webp", type: "projectile_modifier" },
	{ id: 171, name: "slow_but_steady", path: "/spells/Spell_slow_but_steady.webp", type: "projectile_modifier" },
	{ id: 172, name: "explosion_remove", path: "/spells/Spell_explosion_remove.webp", type: "projectile_modifier" },
	{ id: 173, name: "explosion_tiny", path: "/spells/Spell_explosion_tiny.webp", type: "projectile_modifier" },
	{ id: 174, name: "laser_emitter_wider", path: "/spells/Spell_laser_emitter_wider.webp", type: "projectile" },
	{ id: 175, name: "mana", path: "/spells/Spell_mana.webp", type: "projectile_modifier" },
	{ id: 176, name: "blood_magic", path: "/spells/Spell_blood_magic.webp", type: "utility" },
	{ id: 177, name: "golden_punch", path: "/spells/Spell_golden_punch.webp", type: "utility" },
	{ id: 178, name: "blood_punch", path: "/spells/Spell_blood_punch.webp", type: "utility" },
	{ id: 179, name: "duplicate", path: "/spells/Spell_duplicate.webp", type: "other" },
	{ id: 180, name: "quantum_split", path: "/spells/Spell_quantum_split.webp", type: "projectile_modifier" },
	{ id: 181, name: "gravity", path: "/spells/Spell_gravity.webp", type: "projectile_modifier" },
	{ id: 182, name: "gravity_anti", path: "/spells/Spell_gravity_anti.webp", type: "projectile_modifier" },
	{ id: 183, name: "sinewave", path: "/spells/Spell_sinewave.webp", type: "projectile_modifier" },
	{ id: 184, name: "chaotic_arc", path: "/spells/Spell_chaotic_arc.webp", type: "projectile_modifier" },
	{ id: 185, name: "pingpong_path", path: "/spells/Spell_pingpong_path.webp", type: "projectile_modifier" },
	{ id: 186, name: "floating_arc", path: "/spells/Spell_floating_arc.webp", type: "projectile_modifier" },
	{ id: 187, name: "avoiding_arc", path: "/spells/Spell_avoiding_arc.webp", type: "projectile_modifier" },
	{ id: 188, name: "fly_downwards", path: "/spells/Spell_fly_downwards.webp", type: "projectile_modifier" },
	{ id: 189, name: "fly_upwards", path: "/spells/Spell_fly_upwards.webp", type: "projectile_modifier" },
	{ id: 190, name: "horizontal_arc", path: "/spells/Spell_horizontal_arc.webp", type: "projectile_modifier" },
	{ id: 191, name: "line_arc", path: "/spells/Spell_line_arc.webp", type: "projectile_modifier" },
	{ id: 192, name: "orbit_shot", path: "/spells/Spell_orbit_shot.webp", type: "projectile_modifier" },
	{ id: 193, name: "spiraling_shot", path: "/spells/Spell_spiraling_shot.webp", type: "projectile_modifier" },
	{ id: 194, name: "phasing_arc", path: "/spells/Spell_phasing_arc.webp", type: "projectile_modifier" },
	{ id: 195, name: "bounce", path: "/spells/Spell_bounce.webp", type: "projectile_modifier" },
	{ id: 196, name: "remove_bounce", path: "/spells/Spell_remove_bounce.webp", type: "projectile_modifier" },
	{ id: 197, name: "homing", path: "/spells/Spell_homing.webp", type: "projectile_modifier" },
	{ id: 198, name: "homing_short", path: "/spells/Spell_homing_short.webp", type: "projectile_modifier" },
	{ id: 199, name: "automatic_rotation", path: "/spells/Spell_automatic_rotation.webp", type: "projectile_modifier" },
	{ id: 200, name: "homing_shooter", path: "/spells/Spell_homing_shooter.webp", type: "projectile_modifier" },
	{ id: 201, name: "autoaim", path: "/spells/Spell_autoaim.webp", type: "projectile_modifier" },
	{ id: 202, name: "homing_accelerating", path: "/spells/Spell_homing_accelerating.webp", type: "projectile_modifier" },
	{ id: 203, name: "homing_cursor", path: "/spells/Spell_homing_cursor.webp", type: "projectile_modifier" },
	{ id: 204, name: "homing_area", path: "/spells/Spell_homing_area.webp", type: "projectile_modifier" },
	{ id: 205, name: "piercing_shot", path: "/spells/Spell_piercing_shot.webp", type: "projectile_modifier" },
	{ id: 206, name: "clipping_shot", path: "/spells/Spell_clipping_shot.webp", type: "projectile_modifier" },
	{ id: 207, name: "damage", path: "/spells/Spell_damage.webp", type: "projectile_modifier" },
	{ id: 208, name: "damage_random", path: "/spells/Spell_damage_random.webp", type: "projectile_modifier" },
	{ id: 209, name: "bloodlust", path: "/spells/Spell_bloodlust.webp", type: "projectile_modifier" },
	{ id: 210, name: "damage_forever", path: "/spells/Spell_damage_forever.webp", type: "projectile_modifier" },
	{ id: 211, name: "critical_hit", path: "/spells/Spell_critical_hit.webp", type: "projectile_modifier" },
	{ id: 212, name: "area_damage", path: "/spells/Spell_area_damage.webp", type: "projectile_modifier" },
	{ id: 213, name: "spells_to_power", path: "/spells/Spell_spells_to_power.webp", type: "projectile" },
	{ id: 214, name: "essence_to_power", path: "/spells/Spell_essence_to_power.webp", type: "projectile_modifier" },
	{ id: 215, name: "heavy_shot", path: "/spells/Spell_heavy_shot.webp", type: "projectile_modifier" },
	{ id: 216, name: "light_shot", path: "/spells/Spell_light_shot.webp", type: "projectile_modifier" },
	{ id: 217, name: "knockback", path: "/spells/Spell_knockback.webp", type: "projectile_modifier" },
	{ id: 218, name: "recoil", path: "/spells/Spell_recoil.webp", type: "projectile_modifier" },
	{ id: 219, name: "recoil_damper", path: "/spells/Spell_recoil_damper.webp", type: "projectile_modifier" },
	{ id: 220, name: "speed", path: "/spells/Spell_speed.webp", type: "projectile_modifier" },
	{ id: 221, name: "accelerating_shot", path: "/spells/Spell_accelerating_shot.webp", type: "projectile" },
	{ id: 222, name: "decelerating_shot", path: "/spells/Spell_decelerating_shot.webp", type: "projectile_modifier" },
	{ id: 223, name: "explosive_projectile", path: "/spells/Spell_explosive_projectile.webp", type: "projectile" },
	{ id: 224, name: "water_to_poison", path: "/spells/Spell_water_to_poison.webp", type: "projectile_modifier" },
	{ id: 225, name: "blood_to_acid", path: "/spells/Spell_blood_to_acid.webp", type: "projectile_modifier" },
	{ id: 226, name: "lava_to_blood", path: "/spells/Spell_lava_to_blood.webp", type: "projectile_modifier" },
	{ id: 227, name: "liquid_to_explosion", path: "/spells/Spell_liquid_to_explosion.webp", type: "projectile_modifier" },
	{ id: 228, name: "toxic_to_acid", path: "/spells/Spell_toxic_to_acid.webp", type: "projectile_modifier" },
	{ id: 229, name: "static_to_sand", path: "/spells/Spell_static_to_sand.webp", type: "projectile_modifier" },
	{ id: 230, name: "transmutation", path: "/spells/Spell_transmutation.webp", type: "projectile_modifier" },
	{ id: 231, name: "random_explosion", path: "/spells/Spell_random_explosion.webp", type: "projectile" },
	{ id: 232, name: "necromancy", path: "/spells/Spell_necromancy.webp", type: "projectile_modifier" },
	{ id: 233, name: "light", path: "/spells/Spell_light.webp", type: "projectile_modifier" },
	{ id: 234, name: "explosion", path: "/spells/Spell_explosion.webp", type: "static_projectile" },
	{ id: 235, name: "explosion_light", path: "/spells/Spell_explosion_light.webp", type: "static_projectile" },
	{ id: 236, name: "fire_blast", path: "/spells/Spell_fire_blast.webp", type: "static_projectile" },
	{ id: 237, name: "poison_blast", path: "/spells/Spell_poison_blast.webp", type: "static_projectile" },
	{ id: 238, name: "alcohol_blast", path: "/spells/Spell_alcohol_blast.webp", type: "static_projectile" },
	{ id: 239, name: "thunder_blast", path: "/spells/Spell_thunder_blast.webp", type: "static_projectile" },
	{ id: 240, name: "berserk_field", path: "/spells/Spell_berserk_field.webp", type: "static_projectile" },
	{ id: 241, name: "polymorph_field", path: "/spells/Spell_polymorph_field.webp", type: "static_projectile" },
	{ id: 242, name: "chaos_polymorph_field", path: "/spells/Spell_chaos_polymorph_field.webp", type: "static_projectile" },
	{ id: 243, name: "electrocution_field", path: "/spells/Spell_electrocution_field.webp", type: "static_projectile" },
	{ id: 244, name: "freeze_field", path: "/spells/Spell_freeze_field.webp", type: "static_projectile" },
	{ id: 245, name: "regeneration_field", path: "/spells/Spell_regeneration_field.webp", type: "static_projectile" },
	{ id: 246, name: "teleportation_field", path: "/spells/Spell_teleportation_field.webp", type: "static_projectile" },
	{ id: 247, name: "levitation_field", path: "/spells/Spell_levitation_field.webp", type: "static_projectile" },
	{ id: 248, name: "shield_field", path: "/spells/Spell_shield_field.webp", type: "static_projectile" },
	{ id: 249, name: "projectile_transmutation_field", path: "/spells/Spell_projectile_transmutation_field.webp", type: "static_projectile" },
	{ id: 250, name: "projectile_thunder_field", path: "/spells/Spell_projectile_thunder_field.webp", type: "static_projectile" },
	{ id: 251, name: "projectile_gravity_field", path: "/spells/Spell_projectile_gravity_field.webp", type: "static_projectile" },
	{ id: 252, name: "vacuum_powder", path: "/spells/Spell_vacuum_powder.webp", type: "static_projectile" },
	{ id: 253, name: "vacuum_liquid", path: "/spells/Spell_vacuum_liquid.webp", type: "static_projectile" },
	{ id: 254, name: "vacuum_entities", path: "/spells/Spell_vacuum_entities.webp", type: "static_projectile" },
	{ id: 255, name: "sea_lava", path: "/spells/Spell_sea_lava.webp", type: "material" },
	{ id: 256, name: "sea_alcohol", path: "/spells/Spell_sea_alcohol.webp", type: "material" },
	{ id: 257, name: "sea_oil", path: "/spells/Spell_sea_oil.webp", type: "material" },
	{ id: 258, name: "sea_water", path: "/spells/Spell_sea_water.webp", type: "material" },
	{ id: 259, name: "sea_acid", path: "/spells/Spell_sea_acid.webp", type: "material" },
	{ id: 260, name: "sea_acid_gas", path: "/spells/Spell_sea_acid_gas.webp", type: "material" },
	{ id: 261, name: "cloud_water", path: "/spells/Spell_cloud_water.webp", type: "static_projectile" },
	{ id: 262, name: "cloud_oil", path: "/spells/Spell_cloud_oil.webp", type: "static_projectile" },
	{ id: 263, name: "cloud_blood", path: "/spells/Spell_cloud_blood.webp", type: "static_projectile" },
	{ id: 264, name: "cloud_acid", path: "/spells/Spell_cloud_acid.webp", type: "static_projectile" },
	{ id: 265, name: "cloud_thunder", path: "/spells/Spell_cloud_thunder.webp", type: "static_projectile" },
	{ id: 266, name: "electric_charge", path: "/spells/Spell_electric_charge.webp", type: "projectile_modifier" },
	{ id: 267, name: "matter_eater", path: "/spells/Spell_matter_eater.webp", type: "projectile_modifier" },
	{ id: 268, name: "freeze", path: "/spells/Spell_freeze.webp", type: "projectile_modifier"},
	{ id: 269, name: "burning_critical", path: "/spells/Spell_burning_critical.webp", type: "projectile_modifier" },
	{ id: 270, name: "critical_water", path: "/spells/Spell_critical_water.webp", type: "projectile_modifier" },
	{ id: 271, name: "critical_oil", path: "/spells/Spell_critical_oil.webp", type: "projectile_modifier" },
	{ id: 272, name: "critical_blood", path: "/spells/Spell_critical_blood.webp", type: "projectile_modifier" },
	{ id: 273, name: "charm_on_toxic", path: "/spells/Spell_charm_on_toxic.webp", type: "projectile_modifier" },
	{ id: 274, name: "explode_on_slime", path: "/spells/Spell_explode_on_slime.webp", type: "projectile_modifier" },
	{ id: 275, name: "explode_on_slime_giga", path: "/spells/Spell_explode_on_slime_giga.webp", type: "projectile_modifier" },
	{ id: 276, name: "explode_on_alcohol", path: "/spells/Spell_explode_on_alcohol.webp", type: "projectile_modifier" },
	{ id: 277, name: "explode_on_alcohol_giga", path: "/spells/Spell_explode_on_alcohol_giga.webp", type: "projectile_modifier" },
	{ id: 278, name: "petrify", path: "/spells/Spell_petrify.webp", type: "projectile_modifier" },
	{ id: 279, name: "rocket_downwards", path: "/spells/Spell_rocket_downwards.webp", type: "projectile_modifier" },
	{ id: 280, name: "rocket_octagon", path: "/spells/Spell_rocket_octagon.webp", type: "projectile_modifier" },
	{ id: 281, name: "fizzle", path: "/spells/Spell_fizzle.webp", type: "projectile_modifier" },
	{ id: 282, name: "bounce_explosion", path: "/spells/Spell_bounce_explosion.webp", type: "projectile_modifier" },
	{ id: 283, name: "bounce_spark", path: "/spells/Spell_bounce_spark.webp", type: "projectile_modifier" },
	{ id: 284, name: "bounce_laser", path: "/spells/Spell_bounce_laser.webp", type: "projectile_modifier" },
	{ id: 285, name: "bounce_laser_emitter", path: "/spells/Spell_bounce_laser_emitter.webp", type: "projectile_modifier" },
	{ id: 286, name: "bounce_larpa", path: "/spells/Spell_bounce_larpa.webp", type: "projectile_modifier" },
	{ id: 287, name: "fireball_ray", path: "/spells/Spell_fireball_ray.webp", type: "projectile_modifier" },
	{ id: 288, name: "lightning_ray", path: "/spells/Spell_lightning_ray.webp", type: "projectile_modifier" },
	{ id: 289, name: "tentacle_ray", path: "/spells/Spell_tentacle_ray.webp", type: "projectile_modifier" },
	{ id: 290, name: "laser_emitter_ray", path: "/spells/Spell_laser_emitter_ray.webp", type: "projectile_modifier" },
	{ id: 291, name: "fireball_ray_line", path: "/spells/Spell_fireball_ray_line.webp", type: "projectile_modifier" },
	{ id: 292, name: "fireball_ray_enemy", path: "/spells/Spell_fireball_ray_enemy.webp", type: "projectile_modifier" },
	{ id: 293, name: "lightning_ray_enemy", path: "/spells/Spell_lightning_ray_enemy.webp", type: "projectile_modifier" },
	{ id: 294, name: "tentacle_ray_enemy", path: "/spells/Spell_tentacle_ray_enemy.webp", type: "projectile_modifier" },
	{ id: 295, name: "gravity_field_enemy", path: "/spells/Spell_gravity_field_enemy.webp", type: "projectile_modifier" },
	{ id: 296, name: "curse", path: "/spells/Spell_curse.webp", type: "projectile_modifier" },
	{ id: 297, name: "curse_wither_projectile", path: "/spells/Spell_curse_wither_projectile.webp", type: "projectile_modifier" },
	{ id: 298, name: "curse_wither_explosion", path: "/spells/Spell_curse_wither_explosion.webp", type: "projectile_modifier" },
	{ id: 299, name: "curse_wither_melee", path: "/spells/Spell_curse_wither_melee.webp", type: "projectile_modifier" },
	{ id: 300, name: "curse_wither_electricity", path: "/spells/Spell_curse_wither_electricity.webp", type: "projectile_modifier" },
	{ id: 301, name: "orbit_discs", path: "/spells/Spell_orbit_discs.webp", type: "projectile_modifier" },
	{ id: 302, name: "orbit_fireballs", path: "/spells/Spell_orbit_fireballs.webp", type: "projectile_modifier" },
	{ id: 303, name: "orbit_nukes", path: "/spells/Spell_orbit_nukes.webp", type: "projectile_modifier" },
	{ id: 304, name: "orbit_lasers", path: "/spells/Spell_orbit_lasers.webp", type: "projectile_modifier" },
	{ id: 305, name: "orbit_larpa", path: "/spells/Spell_orbit_larpa.webp", type: "projectile_modifier" },
	{ id: 306, name: "chain_shot", path: "/spells/Spell_chain_shot.webp", type: "projectile_modifier" },
	{ id: 307, name: "arc_electric", path: "/spells/Spell_arc_electric.webp", type: "projectile_modifier" },
	{ id: 308, name: "arc_fire", path: "/spells/Spell_arc_fire.webp", type: "projectile_modifier" },
	{ id: 309, name: "arc_gunpowder", path: "/spells/Spell_arc_gunpowder.webp", type: "projectile_modifier" },
	{ id: 310, name: "arc_poison", path: "/spells/Spell_arc_poison.webp", type: "projectile_modifier" },
	{ id: 311, name: "crumbling_earth_projectile", path: "/spells/Spell_crumbling_earth_projectile.webp", type: "projectile_modifier" },
	{ id: 312, name: "x_ray", path: "/spells/Spell_x_ray.webp", type: "utility" },
	{ id: 313, name: "unstable_gunpowder", path: "/spells/Spell_unstable_gunpowder.webp", type: "projectile_modifier" },
	{ id: 314, name: "acid_trail", path: "/spells/Spell_acid_trail.webp", type: "projectile_modifier" },
	{ id: 315, name: "poison_trail", path: "/spells/Spell_poison_trail.webp", type: "projectile_modifier" },
	{ id: 316, name: "oil_trail", path: "/spells/Spell_oil_trail.webp", type: "projectile_modifier" },
	{ id: 317, name: "water_trail", path: "/spells/Spell_water_trail.webp", type: "projectile_modifier" },
	{ id: 318, name: "gunpowder_trail", path: "/spells/Spell_gunpowder_trail.webp", type: "projectile_modifier" },
	{ id: 319, name: "fire_trail", path: "/spells/Spell_fire_trail.webp", type: "projectile_modifier" },
	{ id: 320, name: "burn_trail", path: "/spells/Spell_burn_trail.webp", type: "projectile_modifier" },
	{ id: 321, name: "torch", path: "/spells/Spell_torch.webp", type: "passive" },
	{ id: 322, name: "torch_electric", path: "/spells/Spell_torch_electric.webp", type: "passive" },
	{ id: 323, name: "energy_shield", path: "/spells/Spell_energy_shield.webp", type: "passive" },
	{ id: 324, name: "energy_shield_sector", path: "/spells/Spell_energy_shield_sector.webp", type: "passive" },
	{ id: 325, name: "projectile_energy_shield", path: "/spells/Spell_projectile_energy_shield.webp", type: "projectile_modifier" },
	{ id: 326, name: "tiny_ghost", path: "/spells/Spell_tiny_ghost.webp", type: "passive" },
	{ id: 327, name: "ocarina_a", path: "/spells/Spell_ocarina_a.webp", type: "other" },
	{ id: 328, name: "ocarina_a2", path: "/spells/Spell_ocarina_a2.webp", type: "other" },
	{ id: 329, name: "ocarina_b", path: "/spells/Spell_ocarina_b.webp", type: "other" },
	{ id: 330, name: "ocarina_c", path: "/spells/Spell_ocarina_c.webp", type: "other" },
	{ id: 331, name: "ocarina_d", path: "/spells/Spell_ocarina_d.webp", type: "other" },
	{ id: 332, name: "ocarina_e", path: "/spells/Spell_ocarina_e.webp", type: "other" },
	{ id: 333, name: "ocarina_f", path: "/spells/Spell_ocarina_f.webp", type: "other" },
	{ id: 334, name: "ocarina_gsharp", path: "/spells/Spell_ocarina_gsharp.webp", type: "other" },
	{ id: 335, name: "kantele_a", path: "/spells/Spell_kantele_a.webp", type: "other" },
	{ id: 336, name: "kantele_d", path: "/spells/Spell_kantele_d.webp", type: "other" },
	{ id: 337, name: "kantele_dis", path: "/spells/Spell_kantele_dis.webp", type: "other" },
	{ id: 338, name: "kantele_e", path: "/spells/Spell_kantele_e.webp", type: "other" },
	{ id: 339, name: "kantele_g", path: "/spells/Spell_kantele_g.webp", type: "other" },
	{ id: 340, name: "random_spell", path: "/spells/Spell_random_spell.webp", type: "projectile" },
	{ id: 341, name: "random_projectile", path: "/spells/Spell_random_projectile.webp", type: "projectile" },
	{ id: 342, name: "random_modifier", path: "/spells/Spell_random_modifier.webp", type: "projectile_modifier" },
	{ id: 343, name: "random_static_projectile", path: "/spells/Spell_random_static_projectile.webp", type: "static_projectile" },
	{ id: 344, name: "draw_random", path: "/spells/Spell_draw_random.webp", type: "other" },
	{ id: 345, name: "draw_random_x3", path: "/spells/Spell_draw_random_x3.webp", type: "other" },
	{ id: 346, name: "draw_3_random", path: "/spells/Spell_draw_3_random.webp", type: "projectile" },
	{ id: 347, name: "all_nukes", path: "/spells/Spell_all_nukes.webp", type: "utility" },
	{ id: 348, name: "all_discs", path: "/spells/Spell_all_discs.webp", type: "utility" },
	{ id: 349, name: "all_rockets", path: "/spells/Spell_all_rockets.webp", type: "utility" },
	{ id: 350, name: "all_deathcrosses", path: "/spells/Spell_all_deathcrosses.webp", type: "utility" },
	{ id: 351, name: "all_blackholes", path: "/spells/Spell_all_blackholes.webp", type: "utility" },
	{ id: 352, name: "all_acid", path: "/spells/Spell_all_acid.webp", type: "utility" },
	{ id: 353, name: "summon_portal", path: "/spells/Spell_summon_portal.webp", type: "other" },
	{ id: 354, name: "all_spells", path: "/spells/Spell_all_spells.webp", type: "other" },
	{ id: 355, name: "trigger", path: "/spells/Spell_trigger.webp", type: "other" },
	{ id: 356, name: "timer", path: "/spells/Spell_timer.webp", type: "other" },
	{ id: 357, name: "death_trigger", path: "/spells/Spell_death_trigger.webp", type: "other" },
	{ id: 358, name: "larpa_chaos", path: "/spells/Spell_larpa_chaos.webp", type: "projectile_modifier" },
	{ id: 359, name: "larpa_downwards", path: "/spells/Spell_larpa_downwards.webp", type: "projectile_modifier" },
	{ id: 360, name: "larpa_upwards", path: "/spells/Spell_larpa_upwards.webp", type: "projectile_modifier" },
	{ id: 361, name: "larpa_chaos_2", path: "/spells/Spell_larpa_chaos_2.webp", type: "projectile_modifier" },
	{ id: 362, name: "larpa_death", path: "/spells/Spell_larpa_death.webp", type: "projectile_modifier" },
	{ id: 363, name: "alpha", path: "/spells/Spell_alpha.webp", type: "other" },
	{ id: 364, name: "gamma", path: "/spells/Spell_gamma.webp", type: "other" },
	{ id: 365, name: "tau", path: "/spells/Spell_tau.webp", type: "other" },
	{ id: 366, name: "omega", path: "/spells/Spell_omega.webp", type: "other" },
	{ id: 367, name: "mu", path: "/spells/Spell_mu.webp", type: "other" },
	{ id: 368, name: "phi", path: "/spells/Spell_phi.webp", type: "other" },
	{ id: 369, name: "sigma", path: "/spells/Spell_sigma.webp", type: "other" },
	{ id: 370, name: "zeta", path: "/spells/Spell_zeta.webp", type: "other" },
	{ id: 371, name: "divide_2", path: "/spells/Spell_divide_2.webp", type: "other" },
	{ id: 372, name: "divide_3", path: "/spells/Spell_divide_3.webp", type: "other" },
	{ id: 373, name: "divide_4", path: "/spells/Spell_divide_4.webp", type: "other" },
	{ id: 374, name: "divide_10", path: "/spells/Spell_divide_10.webp", type: "other" },
	{ id: 375, name: "meteor_rain", path: "/spells/Spell_meteor_rain.webp", type: "static_projectile" },
	{ id: 376, name: "worm_rain", path: "/spells/Spell_worm_rain.webp", type: "static_projectile" },
	{ id: 377, name: "reset", path: "/spells/Spell_reset.webp", type: "utility" },
	{ id: 378, name: "Req_Enemies", path: "/spells/Spell_Req_Enemies.webp", type: "other" },
	{ id: 379, name: "Req_Projectile", path: "/spells/Spell_Req_Projectile.webp", type: "other" },
	{ id: 380, name: "Req_Lowhealth", path: "/spells/Spell_Req_Lowhealth.webp", type: "other" },
	{ id: 381, name: "Req_Everyother", path: "/spells/Spell_Req_Everyother.webp", type: "other" },
	{ id: 382, name: "Req_Endpoint", path: "/spells/Spell_Req_Endpoint.webp", type: "other" },
	{ id: 383, name: "Req_Otherwise", path: "/spells/Spell_Req_Otherwise.webp", type: "other" },
	{ id: 384, name: "colour_red", path: "/spells/Spell_colour_red.webp", type: "projectile_modifier" },
	{ id: 385, name: "colour_orange", path: "/spells/Spell_colour_orange.webp", type: "projectile_modifier" },
	{ id: 386, name: "colour_green", path: "/spells/Spell_colour_green.webp", type: "projectile_modifier" },
	{ id: 387, name: "colour_yellow", path: "/spells/Spell_colour_yellow.webp", type: "projectile_modifier" },
	{ id: 388, name: "colour_purple", path: "/spells/Spell_colour_purple.webp", type: "projectile_modifier" },
	{ id: 389, name: "colour_blue", path: "/spells/Spell_colour_blue.webp", type: "projectile_modifier" },
	{ id: 390, name: "colour_rainbow", path: "/spells/Spell_colour_rainbow.webp", type: "projectile_modifier" },
	{ id: 391, name: "colour_invis", path: "/spells/Spell_colour_invis.webp", type: "projectile_modifier" },
	{ id: 392, name: "rainbow_trail", path: "/spells/Spell_rainbow_trail.webp", type: "projectile_modifier" }
];

export default SpellList;