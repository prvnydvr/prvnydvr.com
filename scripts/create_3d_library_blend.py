import math
from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "blender" / "praveen-3d-library-starter.blend"


def clear_file():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()
    for material in list(bpy.data.materials):
        bpy.data.materials.remove(material)
    for mesh in list(bpy.data.meshes):
        bpy.data.meshes.remove(mesh)


def material(name, color, roughness=0.45, metallic=0.0, alpha=1.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Alpha"].default_value = alpha
    if alpha < 1:
        mat.blend_method = "BLEND"
        mat.use_screen_refraction = True
        bsdf.inputs["Alpha"].default_value = alpha
    return mat


def add_cube(name, loc, scale, mat=None, bevel=0.0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if mat:
        obj.data.materials.append(mat)
    if bevel:
        mod = obj.modifiers.new("soft bevel", "BEVEL")
        mod.width = bevel
        mod.segments = 8
        obj.modifiers.new("weighted normals", "WEIGHTED_NORMAL")
    return obj


def add_cylinder(name, loc, radius, depth, mat=None, vertices=64, bevel=False):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=loc)
    obj = bpy.context.object
    obj.name = name
    if mat:
        obj.data.materials.append(mat)
    if bevel:
        mod = obj.modifiers.new("soft bevel", "BEVEL")
        mod.width = 0.035
        mod.segments = 6
        obj.modifiers.new("weighted normals", "WEIGHTED_NORMAL")
    return obj


def add_uv_sphere(name, loc, radius, mat=None, segments=48):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments, ring_count=24, radius=radius, location=loc)
    obj = bpy.context.object
    obj.name = name
    if mat:
        obj.data.materials.append(mat)
    return obj


def add_text(name, text, loc, size=0.35, mat=None, rot=(math.radians(70), 0, 0)):
    bpy.ops.object.text_add(location=loc, rotation=rot)
    obj = bpy.context.object
    obj.name = name
    obj.data.body = text
    obj.data.align_x = "CENTER"
    obj.data.align_y = "CENTER"
    obj.data.size = size
    obj.data.extrude = 0.01
    if mat:
        obj.data.materials.append(mat)
    return obj


def add_camera(scene, loc, rot, lens=42):
    bpy.ops.object.camera_add(location=loc, rotation=rot)
    camera = bpy.context.object
    camera.name = f"{scene.name} Camera"
    camera.data.lens = lens
    scene.camera = camera
    return camera


def add_light(name, loc, power=450, size=4):
    bpy.ops.object.light_add(type="AREA", location=loc)
    light = bpy.context.object
    light.name = name
    light.data.energy = power
    light.data.size = size
    return light


def setup_scene(scene):
    bpy.context.window.scene = scene
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 80
    scene.view_settings.view_transform = "Filmic"
    scene.view_settings.look = "Medium High Contrast"
    scene.render.resolution_x = 1600
    scene.render.resolution_y = 1000
    world = scene.world or bpy.data.worlds.new(f"{scene.name} World")
    scene.world = world
    world.color = (0.03, 0.032, 0.035)


def create_scene(name):
    scene = bpy.data.scenes.new(name)
    setup_scene(scene)
    return scene


def triangular_prism_mesh(name, length, radius, mat=None):
    vertices = [
        (-length / 2, -radius, -radius),
        (-length / 2, radius, -radius),
        (-length / 2, 0, radius),
        (length / 2, -radius, -radius),
        (length / 2, radius, -radius),
        (length / 2, 0, radius),
    ]
    faces = [(0, 1, 2), (3, 5, 4), (0, 3, 4, 1), (1, 4, 5, 2), (2, 5, 3, 0)]
    mesh = bpy.data.meshes.new(f"{name} Mesh")
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    if mat:
        mesh.materials.append(mat)
    return obj


clear_file()
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

mat_black = material("soft matte black", (0.015, 0.015, 0.016, 1), 0.55)
mat_graphite = material("graphite metal", (0.12, 0.12, 0.13, 1), 0.32, 0.65)
mat_white = material("warm gallery white", (0.9, 0.88, 0.82, 1), 0.6)
mat_glass = material("soft transparent glass", (0.75, 0.9, 1.0, 0.32), 0.03, 0.0, 0.32)
mat_blue = material("electric blue", (0.04, 0.22, 1.0, 1), 0.28)
mat_pink = material("signal pink", (1.0, 0.09, 0.42, 1), 0.35)
mat_green = material("quiet green", (0.0, 0.75, 0.48, 1), 0.4)
mat_amber = material("warm amber", (1.0, 0.55, 0.12, 1), 0.42)
mat_concrete = material("matte concrete", (0.42, 0.41, 0.39, 1), 0.75)
mat_wood = material("warm walnut", (0.42, 0.22, 0.11, 1), 0.5)
mat_screen = material("dark glass screen", (0.02, 0.04, 0.05, 1), 0.12)


# Scene 1: Product render
scene = bpy.data.scenes[0]
scene.name = "01 Product Render - Tactile Deck"
setup_scene(scene)
add_cube("studio floor", (0, 0, -0.08), (7, 5, 0.08), mat_white)
base = add_cube("anodized controller base", (0, 0, 0.18), (3.8, 2.2, 0.34), mat_graphite, 0.08)
screen = add_cube("dark display strip", (0, 0.68, 0.39), (2.7, 0.42, 0.035), mat_screen, 0.035)
for row in range(2):
    for col in range(5):
        x = -1.25 + col * 0.62
        y = -0.48 + row * 0.48
        key = add_cube(f"frosted glass key {row + 1}-{col + 1}", (x, y, 0.43), (0.42, 0.32, 0.08), mat_glass, 0.045)
for x in (-1.35, 1.35):
    knob = add_cylinder("machined control dial", (x, 0.78, 0.54), 0.22, 0.16, mat_black, bevel=True)
    knob.rotation_euler[0] = math.radians(90)
add_text("product label", "PRODUCT RENDER", (0, -1.55, 0.04), 0.22, mat_black)
add_light("large softbox left", (-2.8, -2.5, 4), 700, 5)
add_light("thin rim light", (3, 2, 2.2), 180, 2)
add_camera(scene, (3.7, -4.0, 2.9), (math.radians(60), 0, math.radians(42)), 55)


# Scene 2: Abstract scene
scene = create_scene("02 Abstract Scene - Prism Study")
add_cube("black floor", (0, 0, -0.06), (7, 5, 0.08), mat_black)
prism = triangular_prism_mesh("central glass prism", 1.8, 0.75, mat_glass)
prism.rotation_euler = (math.radians(90), 0, math.radians(18))
colors = [mat_blue, mat_green, mat_amber, mat_pink]
for idx, mat in enumerate(colors):
    beam = add_cube(f"spectral beam {idx + 1}", (-2.4 + idx * 0.35, -0.25 + idx * 0.16, 0.45 + idx * 0.05), (2.6, 0.045, 0.045), mat)
    beam.rotation_euler[2] = math.radians(13 + idx * 4)
for idx in range(9):
    add_uv_sphere(f"floating particle {idx + 1}", (-1.8 + idx * 0.45, 0.85 + math.sin(idx) * 0.35, 0.35 + (idx % 3) * 0.22), 0.045, mat_white, 24)
add_text("abstract label", "ABSTRACT SCENE", (0, -1.75, 0.06), 0.23, mat_white)
add_light("cool overhead panel", (0, -2, 4), 520, 4)
add_light("blue side glow", (-3, 1.5, 2), 220, 2.5)
add_camera(scene, (3.5, -4.2, 2.6), (math.radians(60), 0, math.radians(38)), 45)


# Scene 3: UI / 3D experiment
scene = create_scene("03 UI 3D Experiment - Interface Panels")
add_cube("neutral floor", (0, 0, -0.08), (7, 5, 0.08), mat_white)
for idx, (x, z, width, accent) in enumerate([(-1.4, 1.1, 1.9, mat_blue), (0.65, 0.8, 1.55, mat_green), (1.55, 1.45, 1.25, mat_pink)]):
    panel = add_cube(f"floating interface panel {idx + 1}", (x, 0, z), (width, 0.08, 1.05), mat_screen, 0.05)
    panel.rotation_euler[2] = math.radians(-6 + idx * 5)
    add_cube(f"panel accent bar {idx + 1}", (x - width * 0.22, -0.055, z + 0.33), (width * 0.45, 0.035, 0.055), accent, 0.015)
    for row in range(3):
        add_cube(f"panel data row {idx + 1}-{row + 1}", (x, -0.06, z + 0.12 - row * 0.21), (width * 0.7, 0.03, 0.035), mat_white, 0.01)
for x in (-1.95, -1.55, 1.25, 1.65):
    add_uv_sphere("cursor node", (x, -0.25, 0.32), 0.055, mat_amber, 32)
add_text("ui label", "UI / 3D EXPERIMENT", (0, -1.75, 0.04), 0.2, mat_black)
add_light("interface softbox", (0, -2.8, 4), 650, 5)
add_camera(scene, (3.4, -4.1, 2.5), (math.radians(61), 0, math.radians(38)), 43)


# Scene 4: Environment design
scene = create_scene("04 Environment Design - Study Space")
add_cube("concrete floor", (0, 0, -0.06), (7, 5, 0.08), mat_concrete)
add_cube("back wall", (0, 1.9, 1.4), (7, 0.08, 2.9), mat_white)
add_cube("left wall", (-3.2, 0, 1.4), (0.08, 4, 2.9), mat_white)
add_cube("desk slab", (0.25, 0.5, 0.78), (2.8, 0.8, 0.12), mat_wood, 0.03)
for x in (-0.9, 1.4):
    add_cube("desk leg", (x, 0.18, 0.35), (0.12, 0.12, 0.75), mat_graphite, 0.015)
for shelf_idx, z in enumerate([1.15, 1.55, 1.95]):
    add_cube(f"wall shelf {shelf_idx + 1}", (-1.25, 1.82, z), (2.1, 0.18, 0.08), mat_wood, 0.02)
    for book in range(5):
        add_cube(f"book {shelf_idx + 1}-{book + 1}", (-2.0 + book * 0.23, 1.68, z + 0.18), (0.11, 0.16, 0.34 + 0.04 * (book % 2)), [mat_blue, mat_green, mat_pink, mat_amber, mat_black][book], 0.008)
add_cube("monitor screen", (0.5, 0.08, 1.22), (1.15, 0.08, 0.7), mat_screen, 0.035)
add_cube("monitor stand", (0.5, 0.18, 0.86), (0.16, 0.14, 0.28), mat_graphite, 0.015)
add_text("environment label", "ENVIRONMENT DESIGN", (0, -1.65, 0.04), 0.2, mat_black)
add_light("window light", (-2.8, -1.8, 3.6), 900, 5.5)
add_light("desk lamp glow", (1.6, 0.1, 1.7), 180, 1.2)
add_camera(scene, (3.2, -4.4, 2.5), (math.radians(61), 0, math.radians(35)), 38)


# Scene 5: Creative technology experiment
scene = create_scene("05 Creative Technology - Node System")
add_cube("dark lab floor", (0, 0, -0.08), (7, 5, 0.08), mat_black)
center = add_uv_sphere("central interaction core", (0, 0, 1.05), 0.34, mat_glass, 64)
for ring_idx, radius in enumerate([0.85, 1.35, 1.85]):
    bpy.ops.mesh.primitive_torus_add(major_radius=radius, minor_radius=0.012, major_segments=128, minor_segments=8, location=(0, 0, 1.05))
    torus = bpy.context.object
    torus.name = f"data orbit ring {ring_idx + 1}"
    torus.rotation_euler = (math.radians(72 + ring_idx * 12), math.radians(18 * ring_idx), math.radians(12))
    torus.data.materials.append([mat_blue, mat_green, mat_pink][ring_idx])
for idx in range(14):
    angle = idx * (math.tau / 14)
    radius = 1.25 + 0.35 * math.sin(idx)
    loc = (math.cos(angle) * radius, math.sin(angle) * radius, 1.05 + 0.45 * math.cos(idx * 0.7))
    add_uv_sphere(f"interactive data node {idx + 1}", loc, 0.07, [mat_blue, mat_green, mat_pink, mat_amber][idx % 4], 32)
for idx in range(6):
    add_cube(f"floating code tile {idx + 1}", (-2.2 + idx * 0.85, -1.45, 0.35 + 0.12 * (idx % 2)), (0.45, 0.06, 0.24), mat_screen, 0.025)
add_text("creative tech label", "CREATIVE TECHNOLOGY", (0, -1.9, 0.06), 0.19, mat_white)
add_light("neon overhead", (0, -2.5, 4.5), 600, 4)
add_light("pink side light", (3, 1.8, 2.2), 260, 2)
add_camera(scene, (3.8, -4.6, 2.9), (math.radians(61), 0, math.radians(39)), 42)


bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")
