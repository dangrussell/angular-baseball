import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BoxGeometry, Mesh, MeshBasicMaterial, MeshBasicMaterialParameters, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, WebGLRenderer, WebGLRendererParameters } from 'three';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef<HTMLCanvasElement>;

  private scene: Scene;
  private renderer: WebGLRenderer;
  private camera: PerspectiveCamera;

  private cubeGeometry: BoxGeometry;
  private cubeMaterial: MeshBasicMaterial;
  private cube: Mesh<BoxGeometry, MeshBasicMaterial>;

  private sphereGeometry: SphereGeometry;
  private sphereMaterial: MeshStandardMaterial;
  private sphere: Mesh<SphereGeometry, MeshStandardMaterial>;

  private readonly width = 800;
  private readonly height = 600;

  constructor() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, this.width / this.height, 0.1, 1000);

    this.cubeGeometry = new BoxGeometry(1, 1, 1);
    const meshBasicMaterialParameters: MeshBasicMaterialParameters = {
      color: 0x00ff00,
    };
    this.cubeMaterial = new MeshBasicMaterial(meshBasicMaterialParameters);
    this.cube = new Mesh(this.cubeGeometry, this.cubeMaterial);

    this.sphereGeometry = new SphereGeometry(15, 32, 16);
    // const meshStandardMaterialParameters: MeshStandardMaterialParameters = {
    //   color: 0x00ff00,
    // };
    this.sphereMaterial = new MeshStandardMaterial();
    this.sphere = new Mesh(this.sphereGeometry, this.sphereMaterial);
  }

  ngOnInit(): void {
    // document.body.appendChild(this.renderer.domElement);

  }

  ngAfterViewInit(): void {
    const webGLRendererParameters: WebGLRendererParameters = {
      canvas: this.canvas.nativeElement,
    };
    this.renderer = new WebGLRenderer(webGLRendererParameters);
    this.renderer.setSize(this.width, this.height);

    this.scene.add(this.cube);
    this.scene.add(this.sphere);

    this.camera.position.z = 5;

    this.animate();
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.sphere.rotation.x += 0.01;
    this.sphere.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  };

}
