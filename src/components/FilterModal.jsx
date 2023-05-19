import { Button, Box, useDisclosure, IconButton } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useState } from 'react';
import { addDocument } from "../firebase/firestore";

function getFileName(path) {
  const parts = path.split('/');
  return parts[parts.length - 1];
}

export default function SortSelect() {
  const Overlay = () => (
    <ModalOverlay
      bg='blockAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<Overlay />);
  const [clicked, setClicked] = useState(false);
  
  const SpellIconButton = ({spellpath}) => {
    const spellKey = getFileName(spellpath);

    const handleSpellButtonClick = () => {
      setClicked((prevState) => ({
        ...prevState,
        [spellKey]: !prevState[spellKey]
      }));
    };

    const bgColor = clicked[spellKey] ? "red" : "#4f4f4f";

    return (
      <IconButton
        bg={bgColor}
        _hover={{ bg: "gray.900" }}
        border="2px solid #931527"
        icon={<img 
          src={spellpath}
          alt='spell'
          style={{ borderRadius: '2px' }}
        />}
        onClick={handleSpellButtonClick}
      />
    );
  }

  const handleFilter = () => {
    console.log("handleFilter pushed");
    addDocument();
  };

  return (
    <Box textAlign='right'>
      <Button 
        onClick={() => {
          setOverlay(<Overlay />)
          onOpen()
        }} colorScheme='blue' size='md'>
        Filter
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent maxW='600px'>
          <ModalHeader>Choose Spell</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SpellIconButton spellpath="/spells/Spell_bomb.webp" />
            <SpellIconButton spellpath="/spells/Spell_light_bullet.webp" />
            <SpellIconButton spellpath="/spells/Spell_light_bullet_trigger.webp" />
            <SpellIconButton spellpath="/spells/Spell_light_bullet_trigger_2.webp" />
            <SpellIconButton spellpath="/spells/Spell_light_bullet_timer.webp" />
            <SpellIconButton spellpath="/spells/Spell_bullet.webp" />
            <SpellIconButton spellpath="/spells/Spell_bullet_trigger.webp" />
            <SpellIconButton spellpath="/spells/Spell_bullet_timer.webp" />
            <SpellIconButton spellpath="/spells/Spell_heavy_bullet.webp" />
            <SpellIconButton spellpath="/spells/Spell_heavy_bullet_trigger.webp" />
            <SpellIconButton spellpath="/spells/Spell_heavy_bullet_timer.webp" />
            <SpellIconButton spellpath="/spells/Spell_air_bullet.webp" />
            <SpellIconButton spellpath="/spells/Spell_slow_bullet.webp" />
            <SpellIconButton spellpath="/spells/Spell_slow_bullet_trigger.webp" />
            <SpellIconButton spellpath="/spells/Spell_slow_bullet_timer.webp" />
            <SpellIconButton spellpath="/spells/Spell_black_hole.webp" />
            <SpellIconButton spellpath="/spells/Spell_black_hole_timer.webp" />
            <SpellIconButton spellpath="/spells/Spell_black_hole_big.webp" />
            <SpellIconButton spellpath="/spells/Spell_black_hole_giga.webp" />
            <SpellIconButton spellpath="/spells/Spell_tentacle_portal.webp" />
            <SpellIconButton spellpath="/spells/Spell_spitter.webp" />
            <SpellIconButton spellpath="/spells/Spell_spitter_timer.webp" />
            <SpellIconButton spellpath="/spells/Spell_spitter_green.webp" />
            <SpellIconButton spellpath="/spells/Spell_spitter_green_timer.webp" />
            <SpellIconButton spellpath="/spells/Spell_spitter_purple.webp" />
            <SpellIconButton spellpath="/spells/Spell_spitter_purple_timer.webp" />
            <SpellIconButton spellpath="/spells/Spell_bubbleshot.webp" />
            <SpellIconButton spellpath="/spells/Spell_bubbleshot_trigger.webp" />
            <SpellIconButton spellpath="/spells/Spell_disc_bullet.webp" />
            <SpellIconButton spellpath="/spells/Spell_disc_bullet_big.webp" />
            <SpellIconButton spellpath="/spells/Spell_omega_disc_bullet.webp" />
            <SpellIconButton spellpath="/spells/Spell_bouncy_orb.webp" />
            <SpellIconButton spellpath="/spells/Spell_bouncy_orb_timer.webp" />
            <SpellIconButton spellpath="/spells/Spell_rubber_ball.webp" />
            <SpellIconButton spellpath="/spells/Spell_arrow.webp" />
            <SpellIconButton spellpath="/spells/Spell_pollen.webp" />
            <SpellIconButton spellpath="/spells/Spell_lance.webp" />
            <SpellIconButton spellpath="/spells/Spell_rocket.webp" />
            <SpellIconButton spellpath="/spells/Spell_rocket_tier_2.webp" />
            <SpellIconButton spellpath="/spells/Spell_rocket_tier_3.webp" />
            <SpellIconButton spellpath="/spells/Spell_grenade.webp" />
            <SpellIconButton spellpath="/spells/Spell_grenade_trigger.webp" />
            <SpellIconButton spellpath="/spells/Spell_grenade_tier_2.webp" />
            <SpellIconButton spellpath="/spells/Spell_grenade_tier_3.webp" />
            <SpellIconButton spellpath="/spells/Spell_grenade_anti.webp" />
            <SpellIconButton spellpath="/spells/Spell_grenade_large.webp" />
            <SpellIconButton spellpath="/spells/Spell_mine.webp" />
            <SpellIconButton spellpath="/spells/Spell_mine_death_trigger.webp" />
            <SpellIconButton spellpath="/spells/Spell_pipe_bomb.webp" />
            <SpellIconButton spellpath="/spells/Spell_pipe_bomb_death_trigger.webp" />
            <SpellIconButton spellpath="/spells/Spell_exploding_deer.webp" />
            <SpellIconButton spellpath="/spells/Spell_duck_2.webp" />
            <SpellIconButton spellpath="/spells/Spell_worm.webp" />
            <SpellIconButton spellpath="/spells/Spell_pipe_bomb_detonator.webp" />
            <SpellIconButton spellpath="/spells/Spell_laser.webp" />
            <SpellIconButton spellpath="/spells/Spell_megalaser.webp" />
            <SpellIconButton spellpath="/spells/Spell_lightning.webp" />
            <SpellIconButton spellpath="/spells/Spell_ball_lightning.webp" />
            <SpellIconButton spellpath="/spells/Spell_laser_emitter.webp" />
            <SpellIconButton spellpath="/spells/Spell_laser_emitter_four.webp" />
            <SpellIconButton spellpath="/spells/Spell_laser_emitter_cutter.webp" />
            <SpellIconButton spellpath="/spells/Spell_digger.webp" />
            <SpellIconButton spellpath="/spells/Spell_powerdigger.webp" />
            <SpellIconButton spellpath="/spells/Spell_chainsaw.webp" />
            <SpellIconButton spellpath="/spells/Spell_luminous_drill.webp" />
            <SpellIconButton spellpath="/spells/Spell_luminous_drill_timer.webp" />
            <SpellIconButton spellpath="/spells/Spell_tentacle.webp" />
            <SpellIconButton spellpath="/spells/Spell_tentacle_timer.webp" />
            <SpellIconButton spellpath="/spells/Spell_heal_bullet.webp" />
            <SpellIconButton spellpath="/spells/Spell_spiral_shot.webp" />
            <SpellIconButton spellpath="/spells/Spell_magic_shield.webp" />
            <SpellIconButton spellpath="/spells/Spell_big_magic_shield.webp" />
            <SpellIconButton spellpath="/spells/Spell_chain_bolt.webp" />
            <SpellIconButton spellpath="/spells/Spell_fireball.webp" />
            <SpellIconButton spellpath="/spells/Spell_meteor.webp" />
            <SpellIconButton spellpath="/spells/Spell_flamethrower.webp" />
            <SpellIconButton spellpath="/spells/Spell_iceball.webp" />
            <SpellIconButton spellpath="/spells/Spell_slimeball.webp" />
            <SpellIconButton spellpath="/spells/Spell_darkflame.webp" />
            <SpellIconButton spellpath="/spells/Spell_missile.webp" />
            <SpellIconButton spellpath="/spells/Spell_machinegun_bullet.webp" />
            <SpellIconButton spellpath="/spells/Spell_pebble.webp" />
            <SpellIconButton spellpath="/spells/Spell_dynamite.webp" />
            <SpellIconButton spellpath="/spells/Spell_glitter_bomb.webp" />
            <SpellIconButton spellpath="/spells/Spell_buckshot.webp" />
            <SpellIconButton spellpath="/spells/Spell_freezing_gaze.webp" />
            <SpellIconButton spellpath="/spells/Spell_glowing_bolt.webp" />
            <SpellIconButton spellpath="/spells/Spell_spore_pod.webp" />
            <SpellIconButton spellpath="/spells/Spell_glue_shot.webp" />
            <SpellIconButton spellpath="/spells/Spell_bomb_holy.webp" />
            <SpellIconButton spellpath="/spells/Spell_bomb_holy_giga.webp" />
            <SpellIconButton spellpath="/spells/Spell_propane_tank.webp" />
            <SpellIconButton spellpath="/spells/Spell_bomb_cart.webp" />
            <SpellIconButton spellpath="/spells/Spell_cursed_orb.webp" />
            <SpellIconButton spellpath="/spells/Spell_expanding_orb.webp" />
            <SpellIconButton spellpath="/spells/Spell_crumbling_earth.webp" />
            <SpellIconButton spellpath="/spells/Spell_summon_rock.webp" />
            <SpellIconButton spellpath="/spells/Spell_summon_egg.webp" />
            <SpellIconButton spellpath="/spells/Spell_summon_hollow_egg.webp" />
            <SpellIconButton spellpath="/spells/Spell_tntbox.webp" />
            <SpellIconButton spellpath="/spells/Spell_tntbox_big.webp" />
            <SpellIconButton spellpath="/spells/Spell_swarm_fly.webp" />
            <SpellIconButton spellpath="/spells/Spell_swarm_firebug.webp" />
            <SpellIconButton spellpath="/spells/Spell_swarm_wasp.webp" />
            <SpellIconButton spellpath="/spells/Spell_friend_fly.webp" />
            <SpellIconButton spellpath="/spells/Spell_acidshot.webp" />
            <SpellIconButton spellpath="/spells/Spell_thunderball.webp" />
            <SpellIconButton spellpath="/spells/Spell_firebomb.webp" />
            <SpellIconButton spellpath="/spells/Spell_soil.webp" />
            <SpellIconButton spellpath="/spells/Spell_death_cross.webp" />
            <SpellIconButton spellpath="/spells/Spell_death_cross_big.webp" />
            <SpellIconButton spellpath="/spells/Spell_infestation.webp" />
            <SpellIconButton spellpath="/spells/Spell_wall_horizontal.webp" />
            <SpellIconButton spellpath="/spells/Spell_wall_vertical.webp" />
            <SpellIconButton spellpath="/spells/Spell_wall_square.webp" />
            <SpellIconButton spellpath="/spells/Spell_temporary_wall.webp" />
            <SpellIconButton spellpath="/spells/Spell_temporary_platform.webp" />
            <SpellIconButton spellpath="/spells/Spell_purple_explosion_field.webp" />
            <SpellIconButton spellpath="/spells/Spell_delayed_spell.webp" />
            <SpellIconButton spellpath="/spells/Spell_long_distance_cast.webp" />
            <SpellIconButton spellpath="/spells/Spell_Teleport_cast.webp" />
            <SpellIconButton spellpath="/spells/Spell_super_teleport_cast.webp" />
            <SpellIconButton spellpath="/spells/Spell_mist_radioactive.webp" />
            <SpellIconButton spellpath="/spells/Spell_mist_alcohol.webp" />
            <SpellIconButton spellpath="/spells/Spell_mist_slime.webp" />
            <SpellIconButton spellpath="/spells/Spell_mist_blood.webp" />
            <SpellIconButton spellpath="/spells/Spell_circle_fire.webp" />
            <SpellIconButton spellpath="/spells/Spell_circle_acid.webp" />
            <SpellIconButton spellpath="/spells/Spell_circle_oil.webp" />
            <SpellIconButton spellpath="/spells/Spell_circle_water.webp" />
            <SpellIconButton spellpath="/spells/Spell_material_water.webp" />
            <SpellIconButton spellpath="/spells/Spell_material_oil.webp" />
            <SpellIconButton spellpath="/spells/Spell_material_blood.webp" />
            <SpellIconButton spellpath="/spells/Spell_material_acid.webp" />
            <SpellIconButton spellpath="/spells/Spell_material_cement.webp" />
            <SpellIconButton spellpath="/spells/Spell_teleport_projectile.webp" />
            <SpellIconButton spellpath="/spells/Spell_teleport_projectile_short.webp" />
            <SpellIconButton spellpath="/spells/Spell_teleport_projectile_static.webp" />
            <SpellIconButton spellpath="/spells/Spell_Swapper_projectile.webp" />
            <SpellIconButton spellpath="/spells/Spell_teleport_projectile_closer.webp" />
            <SpellIconButton spellpath="/spells/Spell_nuke.webp" />
            <SpellIconButton spellpath="/spells/Spell_nuke_giga.webp" />
            <SpellIconButton spellpath="/spells/Spell_fireworks.webp" />
            <SpellIconButton spellpath="/spells/Spell_summon_wandghost.webp" />
            <SpellIconButton spellpath="/spells/Spell_touch_gold.webp" />
            <SpellIconButton spellpath="/spells/Spell_touch_water.webp" />
            <SpellIconButton spellpath="/spells/Spell_touch_oil.webp" />
            <SpellIconButton spellpath="/spells/Spell_touch_alcohol.webp" />
            <SpellIconButton spellpath="/spells/Spell_touch_blood.webp" />
            <SpellIconButton spellpath="/spells/Spell_touch_smoke.webp" />
            <SpellIconButton spellpath="/spells/Spell_destruction.webp" />

            <SpellIconButton spellpath="/spells/Spell_burst_2.webp" />
            <SpellIconButton spellpath="/spells/Spell_burst_3.webp" />
            <SpellIconButton spellpath="/spells/Spell_burst_4.webp" />
            <SpellIconButton spellpath="/spells/Spell_burst_8.webp" />
            <SpellIconButton spellpath="/spells/Spell_burst_x.webp" />
            <SpellIconButton spellpath="/spells/Spell_scatter_2.webp" />
            <SpellIconButton spellpath="/spells/Spell_scatter_3.webp" />
            <SpellIconButton spellpath="/spells/Spell_scatter_4.webp" />
            <SpellIconButton spellpath="/spells/Spell_i_shape.webp" />
            <SpellIconButton spellpath="/spells/Spell_y_shape.webp" />
            <SpellIconButton spellpath="/spells/Spell_t_shape.webp" />
            <SpellIconButton spellpath="/spells/Spell_w_shape.webp" />
            <SpellIconButton spellpath="/spells/Spell_circle_shape.webp" />
            <SpellIconButton spellpath="/spells/Spell_pentagram_shape.webp" />
            <SpellIconButton spellpath="/spells/Spell_spread_reduce.webp" />
            <SpellIconButton spellpath="/spells/Spell_heavy_spread.webp" />
            <SpellIconButton spellpath="/spells/Spell_recharge.webp" />
            <SpellIconButton spellpath="/spells/Spell_lifetime.webp" />
            <SpellIconButton spellpath="/spells/Spell_lifetime_down.webp" />
            <SpellIconButton spellpath="/spells/Spell_nolla.webp" />
            <SpellIconButton spellpath="/spells/Spell_slow_but_steady.webp" />
            <SpellIconButton spellpath="/spells/Spell_explosion_remove.webp" />
            <SpellIconButton spellpath="/spells/Spell_explosion_tiny.webp" />
            <SpellIconButton spellpath="/spells/Spell_laser_emitter_wider.webp" />
            <SpellIconButton spellpath="/spells/Spell_mana.webp" />
            <SpellIconButton spellpath="/spells/Spell_blood_magic.webp" />
            <SpellIconButton spellpath="/spells/Spell_golden_punch.webp" />
            <SpellIconButton spellpath="/spells/Spell_blood_punch.webp" />
            <SpellIconButton spellpath="/spells/Spell_duplicate.webp" />
            <SpellIconButton spellpath="/spells/Spell_quantum_split.webp" />
            <SpellIconButton spellpath="/spells/Spell_gravity.webp" />
            <SpellIconButton spellpath="/spells/Spell_gravity_anti.webp" />
            <SpellIconButton spellpath="/spells/Spell_sinewave.webp" />
            <SpellIconButton spellpath="/spells/Spell_chaotic_arc.webp" />
            <SpellIconButton spellpath="/spells/Spell_pingpong_path.webp" />
            <SpellIconButton spellpath="/spells/Spell_floating_arc.webp" />
            <SpellIconButton spellpath="/spells/Spell_avoiding_arc.webp" />
            <SpellIconButton spellpath="/spells/Spell_fly_downwards.webp" />
            <SpellIconButton spellpath="/spells/Spell_fly_upwards.webp" />
            <SpellIconButton spellpath="/spells/Spell_horizontal_arc.webp" />
            <SpellIconButton spellpath="/spells/Spell_line_arc.webp" />
            <SpellIconButton spellpath="/spells/Spell_orbit_shot.webp" />
            <SpellIconButton spellpath="/spells/Spell_spiraling_shot.webp" />
            <SpellIconButton spellpath="/spells/Spell_phasing_arc.webp" />
            <SpellIconButton spellpath="/spells/Spell_bounce.webp" />
            <SpellIconButton spellpath="/spells/Spell_remove_bounce.webp" />
            <SpellIconButton spellpath="/spells/Spell_homing.webp" />
            <SpellIconButton spellpath="/spells/Spell_homing_short.webp" />
            <SpellIconButton spellpath="/spells/Spell_automatic_rotation.webp" />
            <SpellIconButton spellpath="/spells/Spell_homing_shooter.webp" />
            <SpellIconButton spellpath="/spells/Spell_autoaim.webp" />
            <SpellIconButton spellpath="/spells/Spell_homing_accelerating.webp" />
            <SpellIconButton spellpath="/spells/Spell_homing_cursor.webp" />
            <SpellIconButton spellpath="/spells/Spell_homing_area.webp" />
            <SpellIconButton spellpath="/spells/Spell_piercing_shot.webp" />
            <SpellIconButton spellpath="/spells/Spell_clipping_shot.webp" />
            <SpellIconButton spellpath="/spells/Spell_damage.webp" />
            <SpellIconButton spellpath="/spells/Spell_damage_random.webp" />
            <SpellIconButton spellpath="/spells/Spell_bloodlust.webp" />
            <SpellIconButton spellpath="/spells/Spell_damage_forever.webp" />
            <SpellIconButton spellpath="/spells/Spell_critical_hit.webp" />
            <SpellIconButton spellpath="/spells/Spell_area_damage.webp" />
            <SpellIconButton spellpath="/spells/Spell_spells_to_power.webp" />
            <SpellIconButton spellpath="/spells/Spell_essence_to_power.webp" />
            <SpellIconButton spellpath="/spells/Spell_heavy_shot.webp" />
            <SpellIconButton spellpath="/spells/Spell_light_shot.webp" />
            <SpellIconButton spellpath="/spells/Spell_knockback.webp" />
            <SpellIconButton spellpath="/spells/Spell_recoil.webp" />
            <SpellIconButton spellpath="/spells/Spell_recoil_damper.webp" />
            <SpellIconButton spellpath="/spells/Spell_speed.webp" />
            <SpellIconButton spellpath="/spells/Spell_accelerating_shot.webp" />
            <SpellIconButton spellpath="/spells/Spell_decelerating_shot.webp" />
            <SpellIconButton spellpath="/spells/Spell_explosive_projectile.webp" />
            <SpellIconButton spellpath="/spells/Spell_water_to_poison.webp" />
            <SpellIconButton spellpath="/spells/Spell_blood_to_acid.webp" />
            <SpellIconButton spellpath="/spells/Spell_lava_to_blood.webp" />
            <SpellIconButton spellpath="/spells/Spell_liquid_to_explosion.webp" />
            <SpellIconButton spellpath="/spells/Spell_toxic_to_acid.webp" />
            <SpellIconButton spellpath="/spells/Spell_static_to_sand.webp" />
            <SpellIconButton spellpath="/spells/Spell_transmutation.webp" />
            <SpellIconButton spellpath="/spells/Spell_random_explosion.webp" />
            <SpellIconButton spellpath="/spells/Spell_necromancy.webp" />
            <SpellIconButton spellpath="/spells/Spell_light.webp" />
            <SpellIconButton spellpath="/spells/Spell_explosion.webp" />
            <SpellIconButton spellpath="/spells/Spell_explosion_light.webp" />
            <SpellIconButton spellpath="/spells/Spell_fire_blast.webp" />
            <SpellIconButton spellpath="/spells/Spell_poison_blast.webp" />
            <SpellIconButton spellpath="/spells/Spell_alcohol_blast.webp" />
            <SpellIconButton spellpath="/spells/Spell_thunder_blast.webp" />
            <SpellIconButton spellpath="/spells/Spell_berserk_field.webp" />
            <SpellIconButton spellpath="/spells/Spell_polymorph_field.webp" />
            <SpellIconButton spellpath="/spells/Spell_chaos_polymorph_field.webp" />
            <SpellIconButton spellpath="/spells/Spell_electrocution_field.webp" />
            <SpellIconButton spellpath="/spells/Spell_freeze_field.webp" />
            <SpellIconButton spellpath="/spells/Spell_regeneration_field.webp" />
            <SpellIconButton spellpath="/spells/Spell_teleportation_field.webp" />
            <SpellIconButton spellpath="/spells/Spell_levitation_field.webp" />
            <SpellIconButton spellpath="/spells/Spell_shield_field.webp" />
            <SpellIconButton spellpath="/spells/Spell_projectile_transmutation_field.webp" />
            <SpellIconButton spellpath="/spells/Spell_projectile_thunder_field.webp" />
            <SpellIconButton spellpath="/spells/Spell_projectile_gravity_field.webp" />
            <SpellIconButton spellpath="/spells/Spell_vacuum_powder.webp" />
            <SpellIconButton spellpath="/spells/Spell_vacuum_liquid.webp" />
            <SpellIconButton spellpath="/spells/Spell_vacuum_entities.webp" />
            <SpellIconButton spellpath="/spells/Spell_sea_lava.webp" />
            <SpellIconButton spellpath="/spells/Spell_sea_alcohol.webp" />
            <SpellIconButton spellpath="/spells/Spell_sea_oil.webp" />
            <SpellIconButton spellpath="/spells/Spell_sea_water.webp" />
            <SpellIconButton spellpath="/spells/Spell_sea_acid.webp" />
            <SpellIconButton spellpath="/spells/Spell_sea_acid_gas.webp" />
            <SpellIconButton spellpath="/spells/Spell_cloud_water.webp" />
            <SpellIconButton spellpath="/spells/Spell_cloud_oil.webp" />
            <SpellIconButton spellpath="/spells/Spell_cloud_blood.webp" />
            <SpellIconButton spellpath="/spells/Spell_cloud_acid.webp" />
            <SpellIconButton spellpath="/spells/Spell_cloud_thunder.webp" />
            <SpellIconButton spellpath="/spells/Spell_electric_charge.webp" />
            <SpellIconButton spellpath="/spells/Spell_matter_eater.webp" />
            <SpellIconButton spellpath="/spells/Spell_freeze.webp" />
            <SpellIconButton spellpath="/spells/Spell_burning_critical.webp" />
            <SpellIconButton spellpath="/spells/Spell_critical_water.webp" />
            <SpellIconButton spellpath="/spells/Spell_critical_oil.webp" />
            <SpellIconButton spellpath="/spells/Spell_critical_blood.webp" />
            <SpellIconButton spellpath="/spells/Spell_charm_on_toxic.webp" />
            <SpellIconButton spellpath="/spells/Spell_explode_on_slime.webp" />
            <SpellIconButton spellpath="/spells/Spell_explode_on_slime_giga.webp" />
            <SpellIconButton spellpath="/spells/Spell_explode_on_alcohol.webp" />
            <SpellIconButton spellpath="/spells/Spell_explode_on_alcohol_giga.webp" />
            <SpellIconButton spellpath="/spells/Spell_petrify.webp" />
            <SpellIconButton spellpath="/spells/Spell_rocket_downwards.webp" />
            <SpellIconButton spellpath="/spells/Spell_rocket_octagon.webp" />
            <SpellIconButton spellpath="/spells/Spell_fizzle.webp" />
            <SpellIconButton spellpath="/spells/Spell_bounce_explosion.webp" />
            <SpellIconButton spellpath="/spells/Spell_bounce_spark.webp" />
            <SpellIconButton spellpath="/spells/Spell_bounce_laser.webp" />
            <SpellIconButton spellpath="/spells/Spell_bounce_laser_emitter.webp" />
            <SpellIconButton spellpath="/spells/Spell_bounce_larpa.webp" />
            <SpellIconButton spellpath="/spells/Spell_fireball_ray.webp" />
            <SpellIconButton spellpath="/spells/Spell_lightning_ray.webp" />
            <SpellIconButton spellpath="/spells/Spell_tentacle_ray.webp" />
            <SpellIconButton spellpath="/spells/Spell_laser_emitter_ray.webp" />
            <SpellIconButton spellpath="/spells/Spell_fireball_ray_line.webp" />
            <SpellIconButton spellpath="/spells/Spell_fireball_ray_enemy.webp" />
            <SpellIconButton spellpath="/spells/Spell_lightning_ray_enemy.webp" />
            <SpellIconButton spellpath="/spells/Spell_tentacle_ray_enemy.webp" />
            <SpellIconButton spellpath="/spells/Spell_gravity_field_enemy.webp" />
            <SpellIconButton spellpath="/spells/Spell_curse.webp" />
            <SpellIconButton spellpath="/spells/Spell_curse_wither_projectile.webp" />
            <SpellIconButton spellpath="/spells/Spell_curse_wither_explosion.webp" />
            <SpellIconButton spellpath="/spells/Spell_curse_wither_melee.webp" />
            <SpellIconButton spellpath="/spells/Spell_curse_wither_electricity.webp" />
            <SpellIconButton spellpath="/spells/Spell_orbit_discs.webp" />
            <SpellIconButton spellpath="/spells/Spell_orbit_fireballs.webp" />
            <SpellIconButton spellpath="/spells/Spell_orbit_nukes.webp" />
            <SpellIconButton spellpath="/spells/Spell_orbit_lasers.webp" />
            <SpellIconButton spellpath="/spells/Spell_orbit_larpa.webp" />
            <SpellIconButton spellpath="/spells/Spell_chain_shot.webp" />
            <SpellIconButton spellpath="/spells/Spell_arc_electric.webp" />
            <SpellIconButton spellpath="/spells/Spell_arc_fire.webp" />
            <SpellIconButton spellpath="/spells/Spell_arc_gunpowder.webp" />
            <SpellIconButton spellpath="/spells/Spell_arc_poison.webp" />
            <SpellIconButton spellpath="/spells/Spell_crumbling_earth_projectile.webp" />
            <SpellIconButton spellpath="/spells/Spell_x_ray.webp" />
            <SpellIconButton spellpath="/spells/Spell_unstable_gunpowder.webp" />
            <SpellIconButton spellpath="/spells/Spell_acid_trail.webp" />
            <SpellIconButton spellpath="/spells/Spell_poison_trail.webp" />
            <SpellIconButton spellpath="/spells/Spell_oil_trail.webp" />
            <SpellIconButton spellpath="/spells/Spell_water_trail.webp" />
            <SpellIconButton spellpath="/spells/Spell_gunpowder_trail.webp" />
            <SpellIconButton spellpath="/spells/Spell_fire_trail.webp" />
            <SpellIconButton spellpath="/spells/Spell_burn_trail.webp" />
            <SpellIconButton spellpath="/spells/Spell_torch.webp" />
            <SpellIconButton spellpath="/spells/Spell_torch_electric.webp" />
            <SpellIconButton spellpath="/spells/Spell_energy_shield.webp" />
            <SpellIconButton spellpath="/spells/Spell_energy_shield_sector.webp" />
            <SpellIconButton spellpath="/spells/Spell_projectile_energy_shield.webp" />
            <SpellIconButton spellpath="/spells/Spell_tiny_ghost.webp" />
            <SpellIconButton spellpath="/spells/Spell_ocarina_a.webp" />
            <SpellIconButton spellpath="/spells/Spell_ocarina_a2.webp" />
            <SpellIconButton spellpath="/spells/Spell_ocarina_b.webp" />
            <SpellIconButton spellpath="/spells/Spell_ocarina_c.webp" />
            <SpellIconButton spellpath="/spells/Spell_ocarina_d.webp" />
            <SpellIconButton spellpath="/spells/Spell_ocarina_e.webp" />
            <SpellIconButton spellpath="/spells/Spell_ocarina_f.webp" />
            <SpellIconButton spellpath="/spells/Spell_ocarina_gsharp.webp" />
            <SpellIconButton spellpath="/spells/Spell_kantele_a.webp" />
            <SpellIconButton spellpath="/spells/Spell_kantele_d.webp" />
            <SpellIconButton spellpath="/spells/Spell_kantele_dis.webp" />
            <SpellIconButton spellpath="/spells/Spell_kantele_e.webp" />
            <SpellIconButton spellpath="/spells/Spell_kantele_g.webp" />
            <SpellIconButton spellpath="/spells/Spell_random_spell.webp" />
            <SpellIconButton spellpath="/spells/Spell_random_projectile.webp" />
            <SpellIconButton spellpath="/spells/Spell_random_modifier.webp" />
            <SpellIconButton spellpath="/spells/Spell_random_static_projectile.webp" />
            <SpellIconButton spellpath="/spells/Spell_draw_random.webp" />
            <SpellIconButton spellpath="/spells/Spell_draw_random_x3.webp" />
            <SpellIconButton spellpath="/spells/Spell_draw_3_random.webp" />
            <SpellIconButton spellpath="/spells/Spell_all_nukes.webp" />
            <SpellIconButton spellpath="/spells/Spell_all_discs.webp" />
            <SpellIconButton spellpath="/spells/Spell_all_rockets.webp" />
            <SpellIconButton spellpath="/spells/Spell_all_deathcrosses.webp" />
            <SpellIconButton spellpath="/spells/Spell_all_blackholes.webp" />
            <SpellIconButton spellpath="/spells/Spell_all_acid.webp" />
            <SpellIconButton spellpath="/spells/Spell_summon_portal.webp" />
            <SpellIconButton spellpath="/spells/Spell_all_spells.webp" />

            <SpellIconButton spellpath="/spells/Spell_trigger.webp" />
            <SpellIconButton spellpath="/spells/Spell_timer.webp" />
            <SpellIconButton spellpath="/spells/Spell_death_trigger.webp" />
            <SpellIconButton spellpath="/spells/Spell_larpa_chaos.webp" />
            <SpellIconButton spellpath="/spells/Spell_larpa_downwards.webp" />
            <SpellIconButton spellpath="/spells/Spell_larpa_upwards.webp" />
            <SpellIconButton spellpath="/spells/Spell_larpa_chaos_2.webp" />
            <SpellIconButton spellpath="/spells/Spell_larpa_death.webp" />
            <SpellIconButton spellpath="/spells/Spell_alpha.webp" />
            <SpellIconButton spellpath="/spells/Spell_gamma.webp" />
            <SpellIconButton spellpath="/spells/Spell_tau.webp" />
            <SpellIconButton spellpath="/spells/Spell_omega.webp" />
            <SpellIconButton spellpath="/spells/Spell_mu.webp" />
            <SpellIconButton spellpath="/spells/Spell_phi.webp" />
            <SpellIconButton spellpath="/spells/Spell_sigma.webp" />
            <SpellIconButton spellpath="/spells/Spell_zeta.webp" />
            <SpellIconButton spellpath="/spells/Spell_divide_2.webp" />
            <SpellIconButton spellpath="/spells/Spell_divide_3.webp" />
            <SpellIconButton spellpath="/spells/Spell_divide_4.webp" />
            <SpellIconButton spellpath="/spells/Spell_divide_10.webp" />
            <SpellIconButton spellpath="/spells/Spell_meteor_rain.webp" />
            <SpellIconButton spellpath="/spells/Spell_worm_rain.webp" />
            <SpellIconButton spellpath="/spells/Spell_reset.webp" />
            <SpellIconButton spellpath="/spells/Spell_Req_Enemies.webp" />
            <SpellIconButton spellpath="/spells/Spell_Req_Projectile.webp" />
            <SpellIconButton spellpath="/spells/Spell_Req_Lowhealth.webp" />
            <SpellIconButton spellpath="/spells/Spell_Req_Everyother.webp" />
            <SpellIconButton spellpath="/spells/Spell_Req_Endpoint.webp" />
            <SpellIconButton spellpath="/spells/Spell_Req_Otherwise.webp" />
            <SpellIconButton spellpath="/spells/Spell_colour_red.webp" />
            <SpellIconButton spellpath="/spells/Spell_colour_orange.webp" />
            <SpellIconButton spellpath="/spells/Spell_colour_green.webp" />
            <SpellIconButton spellpath="/spells/Spell_colour_yellow.webp" />
            <SpellIconButton spellpath="/spells/Spell_colour_purple.webp" />
            <SpellIconButton spellpath="/spells/Spell_colour_blue.webp" />
            <SpellIconButton spellpath="/spells/Spell_colour_rainbow.webp" />
            <SpellIconButton spellpath="/spells/Spell_colour_invis.webp" />
            <SpellIconButton spellpath="/spells/Spell_rainbow_trail.webp" />
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>Close</Button>
            <Button colorScheme='blue' mr={3} onClick={handleFilter}>Filter</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
